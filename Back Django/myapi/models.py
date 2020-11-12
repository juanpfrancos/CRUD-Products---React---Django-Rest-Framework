from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=12)
    price = models.IntegerField()
    reference = models.CharField(max_length=9)
    def __str__(self):
        return self.name