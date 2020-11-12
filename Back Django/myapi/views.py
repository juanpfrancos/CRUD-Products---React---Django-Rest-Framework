from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product

#ModelViewSet is a special view that Django Rest Framework provides. It will handle GET and POST for Heroes without us having to do any more work.
class ProductViewSet(viewsets.ModelViewSet):
    #Query the database for all heroes
    queryset = Product.objects.all().order_by('name')

    #Pass that database queryset into the serializer we just created, so that it gets converted into JSON and rendered
    serializer_class = ProductSerializer