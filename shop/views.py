from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics,mixins
from .serializers import *
from .models import *

# Create your views here.

class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('?')
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

