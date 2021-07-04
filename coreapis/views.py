from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from system_supports.models import (Feedback,
 reportRestaurant)
from store.models import (Dish, 
    Delivery, Restaurant, 
    Customer, Payments, 
    Order, OrderItem)
from .serializers import (FeedbackSerializer, DishSerializer,
    reportRestaurantSerializer)



@api_view(['GET'])
def feedbacks(request):
    feedbacks = Feedback.objects.all()
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def feedback(request, feedbackId):
    feedback = Feedback.objects.get(id=feedbackId)
    serializer = FeedbackSerializer(feedback, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def create_feedback(request):
    feedbackSerializer = FeedbackSerializer(data=request.data)
    if feedbackSerializer.is_valid():
        feedbackSerializer.save()
    return Response(feedbackSerializer.data)


@api_view(['GET'])
def reports(request):
    reports = reportRestaurant.objects.all()
    serializer = reportRestaurantSerializer(reports, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def report(request, reportId):
    try:
        report = reportRestaurant.objects.get(id= reportId)
    except Exception as err:
        return redirect('reports')
    serializer = reportRestaurantSerializer(report, many=True)
    return Response(serializer.data)  


@api_view(['POST'])
def reportRestaurant(request):
    reportSerializer = reportRestaurantSerializer(request.data)
    print(dir(reportSerializer))
    reportSerializer.instance.customer_id = request.user.id
    if reportSerializer.is_valid():
        reportSerializer.save()
    return Response(reportSerializer.data)


@api_view(['POST'])
def makedish(request):
    dishSerializer = DishSerializer(data=request.data)
    if dishSerializer.is_valid():
        dishSerializer.save()
    return Response(dishSerializer.data)


@api_view(['POST'])
def updatedish(request, dishId):
    dish = Dish.objects.get(id=dishId)
    serializer = DishSerializer(data=request.data, instance=dish)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def dishes(request):
    dishes = Dish.objects.all()
    serializer = DishSerializer(dishes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def dish(request, dishId):
    dish = Dish.objects.get(id = dishId)
    serializer = DishSerializer(dish, many=False)
    return Response(serializer.data)