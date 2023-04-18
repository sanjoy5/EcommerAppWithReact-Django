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
    
    def create(self,request):
        try:
            data = request.data
            cart_id = data['cartid']
            address = data['address']
            phone = data['phone']
            email = data['email']

            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.complete = True
            cart_obj.save()
            Order.objects.create(
                cart = cart_obj,
                address = address,
                phone=phone,
                email=email,
                total = cart_obj.total,
                discount = 3,
            )
            res_msg = {"error":False,"message":"Your Order is completed..."}
        except:
            res_msg = {"error":True,"data":'Something is wrong. Order is not complete...'}

        return Response(res_msg)
    
    def destroy(self,request,pk=None):
        try:
            order_obj = Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id = order_obj.cart.id)
            order_obj.delete()
            cart_obj.delete()
            res_msg = {"error":False,"message":"Your Order is Deleted..."}
        except:
            res_msg = {"error":True,"message":"Your Order is not Deleted..."}

        return Response(res_msg)


class addToCart(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        # print(product_obj,"product_obj")        
        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        
        try:
            if cart_cart:
                # print(cart_cart)
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    # print("OLD CART PRODUCT--OLD CART")
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.price
                    cart_cart.save()
                else:
                    # print("NEW CART PRODUCT CREATED--OLD CART")
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  = product_obj.price,
                        quantity = 1,
                        subtotal = product_obj.price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.price
                    cart_cart.save()
            else:
                # print(cart_cart)
                # print("NEW CART CREATED")
                Cart.objects.create(customer=request.user.profile,total=0,complete=False)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  = product_obj.price,
                        quantity = 1,
                        subtotal = product_obj.price
                    )
                cart_product_new.product.add(product_obj)
                # print("NEW CART PRODUCT CREATED")    
                new_cart.total += product_obj.price
                new_cart.save()

            response_mesage = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            response_mesage = {'error':True,'message':"Product Not add!Somthing is Wromg"}

        return Response(response_mesage)
    

class AddCartQty(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity += 1
        cart_product.subtotal += cart_product.price
        cart_product.save()
        cart_obj.total += cart_product.price
        cart_obj.save()
        return Response({"message":"Add CartProduct Quantity","product":request.data['id']})


class RemoveCartQty(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity -= 1
        cart_product.subtotal -= cart_product.price
        cart_product.save()
        cart_obj.total -= cart_product.price
        cart_obj.save()
        if(cart_product.quantity==0):
            cart_product.delete()
        return Response({"message":"Remove CartProduct Quantity","product":request.data['id']})



class RemoveCartProduct(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        cart_product = CartProduct.objects.get(id=request.data['id'])
        cart_product.delete()
        return Response({"message":"CartProduct is Deleted"})
    

class DeleteCart(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try:
            cart_id = request.data['id']
            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.delete()
            response_mesage = {'error':False,'message':"Cart is Deleted Successfully","cartId":cart_id}
        except:
            response_mesage = {'error':True,'message':"Something is wrond. Cart is not Deleted"}
        return Response(response_mesage)



class RegisterView(views.APIView):
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"User is created for '{serializers.data['username']}'"})
        return Response({"error":True,"message":"Something is Wrong"})