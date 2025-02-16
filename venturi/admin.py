from django.contrib import admin
from .models import Client

# Register your models here.
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('code', 'title', 'description', 'quantity', 'price', 'image')
#     search_fields = ['title']
#     readonly_fields = ('created', 'updated')
#     filter_horizontal = ()
#     list_filter = ()
#     fieldsets = ()

# class ClientAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'email', 'telephone')
#     search_fields = ['name']
#     readonly_fields = ('created', 'updated')
#     filter_horizontal = ()
#     list_filter = ()
#     fieldsets = ()

# class CompanyAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'telephone', 'address')
#     search_fields = ['name']
#     readonly_fields = ('created', 'updated')
#     filter_horizontal = ()
#     list_filter = ()
#     fieldsets = ()

# admin.site.register(Product, ProductAdmin)
# admin.site.register(Client, ClientAdmin)
# admin.site.register(Company, CompanyAdmin)