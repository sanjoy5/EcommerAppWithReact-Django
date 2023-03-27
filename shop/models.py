from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile/',blank=True,null=True)

    def __str__(self):
        return self.user.username
    
class Category(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Product(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,blank=True,null=True)
    image = models.ImageField(upload_to='product_imgs/',blank=True,null=True)
    old_price = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    description = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Cart(models.Model):
    customer = models.ForeignKey(Profile,on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complete = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"CartId=={self.id}==Customer=={self.customer}==Total=={self.total}==Complete=={self.complete}"

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return  f"Cart == {self.cart.id}==CartProduct=={self.id}==quantity=={self.quantity}"
    

ORDER_STATUS = {
    ('Order received','Order received'),
    ('Order Processing','Order Processing'),
    ('On the way','On the way'),
    ('Order Completed','Order Completed'),
    ('Order Canceled','Order Canceled')
}

class Order(models.Model):
    cart = models.OneToOneField(Cart,on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=11)
    email = models.EmailField(max_length=200)
    total = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    order_status = models.CharField(max_length=50,choices=ORDER_STATUS,default='Order received')
    payment = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"OrderId=={self.id}==Address=={self.address}==OrderStatus=={self.order_status}==Payment=={self.payment}"
