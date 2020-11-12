#Import the REST Framework serializer
from rest_framework import serializers
from .models import Product

#Create a new class that links the Hero with its serializer

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'reference')