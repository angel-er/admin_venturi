from django.contrib import admin
from .models import *

# Register your models here.
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'last_name', 'telephone', 'email', 'created', 'updated',)
    list_display_links = ('name', 'last_name', 'email',)
    list_per_page = 25

admin.site.register(Client, ClientAdmin)