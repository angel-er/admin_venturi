from django.contrib import admin
from .models import *

# Register your models here.
class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'client', 'service_type', 'payment_type', 'payment_cash', 'payment_qr', 'payment_card', 'total_canceled', 'total_amount', 'change', )
    list_display_links = ('client', 'service_type', 'date', 'total_amount',)
    list_per_page = 25
    search_fields = ('client', 'service_type', 'date',)
    list_filter = ('client', 'service_type', 'payment_type', 'date',)

class TicketItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'ticket', 'product', 'flavor', 'quantity', 'price', 'subtotal', 'created',)
    list_display_links = ('product', 'ticket',)
    list_per_page = 25
    search_fields = ('product', 'ticket', 'flavor')
    list_filter = ('product', 'ticket', 'flavor')

admin.site.register(Ticket, TicketAdmin)
admin.site.register(TicketItem, TicketItemAdmin)