from django.db import models

# Create your models here.
class IceCreamFlavor(models.Model):
    flavor = models.CharField(max_length=20, default='chocolate', unique=True,)
    available = models.BooleanField(default=True, unique=False)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'flavor'
        verbose_name = ('Ice Cream Flavor')
        verbose_name_plural = ('Ice cream Flavors')
        order_with_respect_to = 'flavor'

    def __str__(self):
        return self.flavor