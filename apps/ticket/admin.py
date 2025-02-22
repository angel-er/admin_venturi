from django.contrib import admin
from .models import *

# Register your models here.
class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'client', 'order_type', 'payment_cash', 'payment_qr', 'payment_card', 'total_canceled', 'total_amount', 'change', )
    list_display_links = ('client', 'order_type', 'date', 'total_amount',)
    list_per_page = 25

class DetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'ticket', 'product', 'quantity_product', 'price_product', 'subtotal_product', 'created',)
    list_display_links = ('product', 'ticket',)
    list_per_page = 25

admin.site.register(Ticket, TicketAdmin)
admin.site.register(Detail, DetailAdmin)