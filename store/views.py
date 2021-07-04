from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse
from profiles.models import (Rider, 
    Staff, 
    Supplier, 
    Customer)
from .models import (Dish,
    Payments,
    Order,
    OrderItem,
    Delivery)
from django.contrib.auth.models import User

from paystack.resource import TransactionResource
import random
import string
from datetime import datetime
from .forms import AddDish, EditDish
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
import json

from app.views import notify

from paystackapi.paystack import Paystack, Transaction
paystack_secret_key = "sk_test_ecd653a97cbfec8ad909e17e9d5a88aa188fd103"
paystack = Paystack(secret_key=paystack_secret_key)


def buyfood(request, id):
    food = Dish.objects.get(id = id)
    return render(request, 'dish.html', {'dish': food})

@login_required(login_url="/login/")
def CreateDish(request):
    if request.method == "POST":
        form = AddDish(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            body = f"You successFully added{dish.name} to menu"
            notify(request.user, body)
            return redirect('restaurant')
    else:
        form = AddDish()

    return render(request, 'addDish.html', {'form': form})


def cart(request):
    if request.user.is_authenticated:
        customer = Customer.objects.get(user=request.user)
        order, created= Order.objects.get_or_create(customer=customer, complete=False)
        print(order)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0}
    
    context = {'items': items, 'order': order}
    return render(request, 'cart.html', context)


PUBLIC_KEY = 'pk_test_82840608689825e6578a49aeb96f936228d16279'
import time
SECRET_KEY = 'sk_test_ecd653a97cbfec8ad909e17e9d5a88aa188fd103'


def checkout(request, id):
    order = Order.objects.get(id=id)
    rand = ''.join(
        [random.choice(
            string.ascii_letters + string.digits) for n in range(16)])

    p = Payments.objects.create(
        id = rand,
        name = request.user,
        email=request.user.email,
        amount = (order.get_cart_total * 100) + 500, 
        verified = False, 
        time = datetime.now()
    )
    p.save()
    email = request.user.email
    amount = order.get_cart_total
    #return redirect(reverse('verify_payments', args=[rand]))
    return render(request, 'paypay.html', context={'email': email, 'amount': amount, 'ref': rand, 'public_key': PUBLIC_KEY})
    

@login_required(login_url="/login/")
def editDish(request, dishId):
    dish = Dish.objects.get(id=dishId)
    if request.method == "POST":
        form = EditDish(request.POST, request.FILES, instance=dish)
        if form.is_valid():
            form.save()
            body = f"You successFully Edited {dish.name}"
            notify(request.user, body)
            return redirect(reverse('buydish', args=[dishId]))
    else:
        form = EditDish(instance=dish)
    
    return render(request, 'editDish.html', {'form': form})


def restaurant(request):
    dishes = Dish.objects.all()
    context = {
        'dishes': dishes
    }

    return render(request, 'restaurant.html', context) 


def transactions(request):
    payment = Payments.objects.all()
    orders = Order.objects.all()
    delivery = Delivery.objects.all() 

    context = {
        'payments': payment,
        'orders': orders,
        'deliveries': delivery
    }

    return render(request, 'transactions.html', context)


def updateDelivery(request):
    data = json.loads(request.body)
    print(data)
    deliveryId = data['deliveryId']
    action = data['action']
    print('Action: ', action)
    print('Delivery: ', deliveryId)
        
    delivery = Delivery.objects.get(id=deliveryId)
    if action == 'confirm':
        delivery.delivered = True
    elif action == 'confirm-delivery':
        delivery.confirm_delivery = True

    if delivery.delivered == True and delivery.confirm_delivery == True:
        delivery.status = 'Completed'
    delivery.save()

    return JsonResponse('Delivery updated successfully!', safe=False)
    

def updateitem(request):
    data = json.loads(request.body)
    print(data)
    dishId = data['dishId']
    action = data['action']
    print('Action:', action)
    print('Dish:', dishId)

    customer = request.user.customer
    dish = Dish.objects.get(id=dishId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    orderItem, created = OrderItem.objects.get_or_create(order=order, dish=dish)

    if action == 'add':
        orderItem.quantity += 1
    elif action == 'remove':
        orderItem.quantity -= 1
    
    orderItem.save()
    if orderItem.quantity <= 0:
        orderItem.delete()

    return JsonResponse('Item was added successfully!', safe=False)

def verify(request):
    return render(request, 'verify.html')


def verify_payments(request, id):
    p = Payments.objects.get(id=id)
    if Transaction.verify(reference=p.id)['status'] == True:
        p.verified = True
        p.save()
        customer = Customer.objects.get(user=request.user)
        order = Order.objects.get(customer=customer)
        customer = request.user
        riders_ls = [rider.user for rider in Rider.objects.all() if rider.is_active == False]
        rider = riders_ls[0]
        email_subject = f"Order for {p.name.username} recieved!"
        email_body = f"Hi {rider.username}, {p.name.username} placed an Order"
        
        msg = f'Your ordered has been sent and will be delivered by {rider} in 15 minutes'
        email = send_mail(email_subject, email_body, 'Noreply@FX.com', [rider.email], fail_silently=True)
        d = Delivery.objects.create(
            order= order,
            rider=rider,
            delivered=False,
            confirm_delivery=False,
            status="In-Progress"
        )
        d.save()
        notify(rider, email_body)
        notify(customer, msg)
    return redirect('restaurant')

