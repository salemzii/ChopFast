from django.db import models
from django.contri.auth.models import User
import uuid
from store.models import Dish, Order


class Wallet(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                          primary_key=True,
                          editable=False)
    user = models.OneToOneField(User,
                             on_delete=models.CASCADE)
    balance = models.IntegerField(default=0)
    last_funded = models.CharField(max_length=50)


    def __str__(self):
        return self.user.username



class Transactions(models.Model):
    id = models.UUIDField(default=uuid.uuid4,
                          primary_key= True,
                          editable=False)
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE, related_name="paid_from")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order")
    paid_to = models.ForeignKey(User,
                                   on_delete=models.CASCADE,
                                   related_name="paid_to")
    

    def __str__(self):
        template =f"{self.id}"
        return template.format(self)



class Restaurant(models.Model):
    name = models.CharField(max_length=120, blank=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=220, blank=False)
    rating = models.IntegerField(default=0)
    menus = models.ForeignKey(Dish, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# Create your models here.
