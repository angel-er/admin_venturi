from django.db import models

# Create your models here.
class Store(models.Model):
    code = models.CharField(max_length=150, unique=True, null=True, blank=True, auto_created=True)
    name_store = models.CharField(max_length=150, unique=True, blank=False)
    unit_store = models.CharField(max_length=150, null=False, blank=False)
    quantity_store = models.DecimalField(max_digits=13, decimal_places=2, null=False, blank=False)
    price_store = models.DecimalField(max_digits=13, decimal_places=2, null=False, blank=False)
    # subtotal_store = models.DecimalField(max_digits=13, decimal_places=2, null=False, blank=False, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = ('Store')
        verbose_name_plural = ('Stores')
        order_with_respect_to = 'name_store' 

    @property
    def subtotal_store(self):
        calculate = self.price_store * self.quantity_store
        # print('Total subtotal: ', round(calculate, 2))
        return calculate
    def __str__(self):
        return self.name_store