from rest_framework import serializers
from profiles.models import (
    Customer,
    Rider,
    Staff, 
    Supplier
)
from system_supports.models import Feedback, reportRestaurant
from store.models import (
    Dish, 
    Order, 
    OrderItem,
    Delivery,
    Restaurant
)



class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = ['title', 'feedback']


class reportRestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = reportRestaurant
        fields = ['customer', 'restaurant', 'report']



class DishSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dish
        fields = '__all__'



"""
customers
rider
staff
supplier
"""

"""
feedback
reportRestaurant
"""

"""
Dish
Order
Orderitem
Delivery
Restaurant
"""
