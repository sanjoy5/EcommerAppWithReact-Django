from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'category', CategoryView, basename='category')

urlpatterns = [
    path('',include(router.urls)),

    path('products/',ProductView.as_view(),name='products'),
    path('product/<int:id>/',ProductView.as_view(),name='product'),
    path('profile/',ProfileView.as_view(),name="profile"),
]
