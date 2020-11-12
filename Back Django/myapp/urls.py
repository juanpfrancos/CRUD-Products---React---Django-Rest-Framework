from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    #just put our API at the index:
    path('', include('myapi.urls')),
 ]