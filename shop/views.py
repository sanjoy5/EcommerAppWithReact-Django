from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics,mixins,viewsets,views
from .serializers import *
from .models import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.

class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)
        

class CategoryView(viewsets.ViewSet):
    def list(self,request):
        queryset = Category.objects.all().order_by('-id')
        serializer = CategorySerializer(queryset,many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Category.objects.get(id=pk)
        serializer = CategorySerializer(queryset)
        serializer_data = serializer.data
        all_data = []
        category_products = Product.objects.filter(category_id=serializer_data['id']) 
        category_products_serializer = ProductSerializer(category_products,many=True)
        serializer_data['category_products'] = category_products_serializer.data
        all_data.append(serializer_data)
        return Response(all_data)


class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def get(self,request):
        try:
            queryset = Profile.objects.get(prouser=request.user)
            serializers = ProfileSerializer(queryset)
            res_msg = {"error":False,"data":serializers.data}
        except:
            res_msg = {"error":True,"data":"Something is wrong !!!"}
        
        return Response(res_msg)

class UpdateUserView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try:
            user = request.user
            data = request.data
            user_obj = User.objects.get(username=user)
            user_obj.first_name = data['first_name']
            user_obj.last_name = data['last_name']
            user_obj.email = data['email']
            user_obj.save()
            res_msg = {"error":False,"message":"User data is updated."}
        except:
            res_msg = {"error":True,"message":"Something is wrong!!! User data is not updated."}      
        return Response(res_msg)
    

class UpdateUserImageView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProfileSerializer(query,data=data,context={"request":request})
            serializers.is_valid()
            serializers.save()
            res_msg = {"error":False,"message":"User Image is updated."}
        except:
            res_msg = {"error":True,"message":"Something is wrong!!! User image is not updated."}      
        return Response(res_msg)
    

class MyCart(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def list(self,request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query,many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart['id'])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            cart['cartproducts'] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)
    
class Oldorders(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def list(self,request):
        queryset = Order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializer(queryset,many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            order['cartproducts'] = cart_product_serializer.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self,request,pk=None):
        try:
            queryset = Order.objects.get(id=pk)
            serializers = OrderSerializer(queryset)
            data =  serializers.data
            all_data = []
            cartproduct = CartProduct.objects.filter(cart_id=data['cart']['id'])
            cartproduct_serializer = CartProductSerializer(cartproduct,many=True)
            data['cartproducts'] = cartproduct_serializer.data
            all_data.append(data)
            res_msg = {"error":False,"data":all_data}
        except:
            res_msg = {"error":True,"message":"Something is wrong!!"}      
        return Response(res_msg)
