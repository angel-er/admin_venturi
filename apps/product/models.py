from django.db import models

# Create your models here.
class Product(models.Model):
    code = models.CharField(max_length=150, unique=True, null=True, blank=True, auto_created=True)
    name_product = models.CharField(max_length=150, unique=True, blank=False)
    description = models.CharField(max_length=150, null=True, blank=False)
    image = models.ImageField(upload_to='products', null=True, blank=True)
    price_product = models.DecimalField(max_digits=13, decimal_places=2, null=False, blank=False)
    # quantity_product = models.DecimalField(max_digits=13, decimal_places=2, null=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = ('Product')
        verbose_name_plural = ('Products')
        order_with_respect_to = 'name_product'

    def __str__(self):
        return self.name_product