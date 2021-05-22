from django.contrib import admin
from .models import Dish, Payments, Order, Delivery


admin.site.register(Dish)
admin.site.register(Payments)
admin.site.register(Order)
admin.site.register(Delivery)


