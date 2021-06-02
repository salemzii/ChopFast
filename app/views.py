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