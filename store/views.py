from django.shortcuts import render, redirect
from django.urls import reverse
from profiles.models import (Rider, 
    Staff, 
    Supplier, 
    Customer)
from .models import (Dish,
    Payments,
    Order, 
    Delivery)
from django.contrib.auth.models import User

from paystack.resource import TransactionResource
import random
import string
from datetime import datetime
from .forms import AddDish, EditDish
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail


from app.views import notify

from paystackapi.paystack import Paystack, Transaction
paystack_secret_key = "sk_test_ecd653a97cbfec8ad909e17e9d5a88aa188fd103"
paystack = Paystack(secret_key=paystack_secret_key)


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


def cart(request):
    if request.user.is_authenticated:
        customer = Customer.objects.get(user=request.user)
        order, created = Order.objects.get_or_create(customer, complete=False)
        items = order.orderitem_set.all()
    else:
        items = []
        order = {'get_cart_total': 0, 'get_cart_items': 0}
    
    context = {'items': items, 'order': order}
    return render(request, 'cart.html', context)


def buyfood(request, id):
    food = Dish.objects.get(id = id)
    return render(request, 'dish.html', {'dish': food})


SECRET_KEY = 'sk_test_ecd653a97cbfec8ad909e17e9d5a88aa188fd103'
def pay(request, dishid):
    rand = ''.join(
        [random.choice(
            string.ascii_letters + string.digits) for n in range(16)])

    food = Dish.objects.get(id = dishid)

    random_ref = rand
    client = TransactionResource(SECRET_KEY, random_ref)
    client.initialize(amount= food.price * 100, email=request.user.email, ref=random_ref)
    client.authorize()
    p = Payments.objects.create(
        id = random_ref,
        name = request.user,
        email=request.user.email,
        amount = (food.price * 100) + 200, 
        verified = False, 
        time = datetime.now()
    )
    p.save()
    return redirect(reverse('verify_payments', args=[random_ref]))


def verify(request):
    return render(request, 'verify.html')


def verify_payments(request, id):
    p = Payments.objects.get(id=id)
    if Transaction.verify(reference=p.id)['status'] == True:
        p.verified = True
        p.save()

        order = Order.objects.create(
        payment=p,
        status='In-Progress',
        )
        order.save()
        riders_ls = [rider.user for rider in Rider.objects.all() if rider.is_active == False]
        rider = riders_ls[0]
        email_subject = f"Order for {p.name.username} recieved!"
        email_body = f"Hi {rider.username}, {p.name.username} placed an Order"

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
    return redirect('restaurant')


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

