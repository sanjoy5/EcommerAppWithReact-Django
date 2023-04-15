from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('category', CategoryView, basename='category')
router.register('cart', MyCart, basename='cart')
router.register('oldorders', Oldorders, basename='oldorders')

urlpatterns = [
    path('',include(router.urls)),

    path('products/',ProductView.as_view(),name='products'),
    path('product/<int:id>/',ProductView.as_view(),name='product'),
    path('profile/',ProfileView.as_view(),name="profile"),
    path('update_user/',UpdateUserView.as_view(),name="update_user"),
    path('update_user_image/',UpdateUserImageView.as_view(),name="update_user_image"),
    path('addtocart/',addToCart.as_view(),name="addtocart"),
    path('addcartqty/', AddCartQty.as_view(),name="addcartqty"),
    path('removecartqty/', RemoveCartQty.as_view(),name="removecartqty"),
    path('removecartproduct/', RemoveCartProduct.as_view(),name="removecartproduct"),
]
