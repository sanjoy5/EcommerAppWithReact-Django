from django.urls import path
from .views import *

urlpatterns = [
    path('products/',ProductView.as_view(),name='products'),
    path('product/<int:id>/',ProductView.as_view(),name='product'),
]
