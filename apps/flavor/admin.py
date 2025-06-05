from django.contrib import admin
from .models import *

# Register your models here.
class IceCreamFlavorAdmin(admin.ModelAdmin):
    list_display = ('id', 'flavor', 'available', 'created',)
    list_display_links = ('flavor', 'available',)
    list_per_page = 25
    search_fields = ('flavor',)
    list_filter = ('flavor', 'available',)

admin.site.register(IceCreamFlavor, IceCreamFlavorAdmin)