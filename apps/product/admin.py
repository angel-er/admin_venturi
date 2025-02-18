from django.contrib import admin
from .models import *

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_product', 'description', 'price_product', 'image', 'created', 'updated', 'updated',)
    list_display_links = ('name_product', 'description', 'price_product', 'created', 'updated',)
    list_per_page = 25

admin.site.register(Product, ProductAdmin)