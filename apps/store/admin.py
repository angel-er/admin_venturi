from django.contrib import admin
from .models import *

# Register your models here.
class StoreAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'name_store', 'quantity_store', 'price_store', 'subtotal_store', 'created', 'updated',)
    list_display_links = ('name_store', 'price_store', 'created', 'updated',)
    list_per_page = 25

admin.site.register(Store, StoreAdmin)