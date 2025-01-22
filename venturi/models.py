from django.db import models
from django.forms import model_to_dict # para trasnformar en type JSON un modelo

# Model Client
class Client(models.Model):
    name = models.CharField(max_length=200, null=True, blank=False)
    email = models.EmailField(max_length=200, null=True, blank=False)
    telephone = models.PositiveIntegerField(null=True, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = ('client')
        verbose_name_plural = ('clients')
    
    def __str__(self):
        return self.name

# Model Product
# class Product(models.Model):
#     code = models.CharField(max_length=150, unique=True, null=True, blank=True, auto_created=True)
#     title = models.CharField(max_length=150, unique=True, blank=False)
#     description = models.CharField(max_length=150, null=True, blank=True)
#     image = models.ImageField(upload_to='products', null=True, blank=True)
#     price = models.DecimalField(max_digits=13, decimal_places=2, null=False, blank=False)
#     quantity = models.DecimalField(max_digits=13, decimal_places=2, null=False)
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)

#     class Meta:
#         verbose_name = ('products')
#         verbose_name_plural = ('products')
#         order_with_respect_to = 'title'

#     def __str__(self):
#         return self.title

# class Output(models.Model):
#     order_date = models.DateField(max_length=255)
#     client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, related_name='client')
#     total = models.DecimalField(max_digits=20, decimal_places=2, default=0)
#     paid = models.DecimalField(max_digits=20, decimal_places=2, default=0)
#     comment = models.TextField(blank=True, null=True)
#     ticket = models.BooleanField(default=True)
#     break_down = models.BooleanField(default=True)
#     created = models.DateTimeField(auto_now=True)
#     update = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         verbose_name = ('output')
#         verbose_name_plural = ('output')
#         order_with_respect_to = 'order_date'

#     def __str__(self):
#         return str(self.id)
    
# class ProductOutput(models.Model):
#     output = models.ForeignKey(Output, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.DecimalField(max_digits=20, decimal_places=2, null=False)
#     price = models.DecimalField(max_digits=20, decimal_places=2, null=False, default=0)
#     subtotal = models.DecimalField(max_digits=20, decimal_places=2, null=False, default=0)
#     iva = models.DecimalField(max_digits=20, decimal_places=2, null=False, default=0)
#     total = models.DecimalField(max_digits=20, decimal_places=2, null=False, default=0)
#     given_money = models.DecimalField(max_digits=10, decimal_places=2, default=True)
#     return_money = models.BooleanField(default=False)
#     created = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         verbose_name = ('product output')
#         verbose_name_plural = ('product output')
#         order_with_respect_to = 'created'

#     def __str__(self):
#         return self.product
    
#     def toJSON(self):
#         item = model_to_dict(self, exclude=['created'])
#         return item

# # Model Company
# class Company(models.Model):
#     name = models.CharField(max_length=200, null=True, blank=False)
#     telephone = models.CharField(max_length=200, null=True, blank=False)
#     address = models.CharField(max_length=150, unique=True, null=True, blank=True)
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         verbose_name = ('company')
#         verbose_name_plural = ('companies')
    
#     def __str__(self):
#         return self.name
