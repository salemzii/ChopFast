from django.urls import path
from . import views


urlpatterns = [
    path('restaurant', views.restaurant, name='restaurant'),
    path('addDish', views.CreateDish, name='addDish'),
    path('editDish/<int:dishId>', views.editDish, name='editDish'),
    path('dish/<int:id>', views.buyfood, name='buydish'),
    path('payfordish/<int:dishid>', views.pay, name='pay'),
    path('verify', views.verify, name='verify'),
    path('verify_payments/<slug:id>', views.verify_payments, name='verify_payments'),
    path('transactions', views.transactions, name='transactions'),
    path('cart', views.cart, name='cart')
]

