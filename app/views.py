# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.http import HttpResponse
from django import template
from store.models import Order, Delivery
from extras.models import Tasks
from .models import Notification


@login_required(login_url="/login/")
def index(request):
    task = Tasks.objects.all()
    order_ls = Order.objects.all()
    #orders = [(order.payment.amount / 100) for order in order_ls] 
    deliveries = Delivery.objects.count()
    context = {
        #'orders': sum(orders),
        'deliveries': deliveries,
        'tasks': task
    }
    return render(request, 'index.html', context)


def notify(user, body):
        notifier = Notification.objects.create(
            user = user, 
            body= body,
        )
        notifier.save()


import os
from twilio.rest import Client
def send_sms(user, msg):
    #remember to replicate this function for rider and customers when you've created a verified twilio account!
        # Download the helper library from https://www.twilio.com/docs/python/install



    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid =  'AC140622d81eaf073184b8bb54c79b3979' #os.environ['TWILIO_ACCOUNT_SID']
    auth_token =   '6cd0a23cf5a498eba8dd24f7757dff71' #os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)
    try:
        message = client.messages \
                .create(
                    body= msg, #"Join Earth's mightiest heroes. Like Kevin Bacon.",
                    from_='+12674294534',
                    to='+2347014327332'
                )

        print(message.sid)
    except Exception as err:
        print("Error Communicating with Twilio")
        print|(err)
        



def delivered(request, deliveryId):
    delivery = Delivery.objects.get(id=deliveryId)

    return render(request, 'delivery.html', {'delivery': delivery})


@login_required(login_url="/login/")
def notifications(request):
    notifications = Notification.objects.all()

    context = {
        'notifications' : notifications,
    }
    return render(request, 'ui-notifications.html', context)



@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:
        
        load_template      = request.path.split('/')[-1]
        context['segment'] = load_template
        
        html_template = loader.get_template( load_template )
        return HttpResponse(html_template.render(context, request))
        
    except template.TemplateDoesNotExist:

        html_template = loader.get_template( 'page-404.html' )
        return HttpResponse(html_template.render(context, request))

    except:
    
        html_template = loader.get_template( 'page-500.html' )
        return HttpResponse(html_template.render(context, request))
