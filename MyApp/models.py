from django.db import models

class MyItem(models.Model):
    name = models.CharField(max_length=20)
    cost = models.CharField(max_length=20)

