from .models import TicketItem, Ticket
from rest_framework import serializers

class TicketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketItem
        fields = ['id', 'ticket', 'product', 'quantity', 'price', 'subtotal', 'created',]


class TicketSerializer(serializers.ModelSerializer):
    items = TicketItemSerializer(many=True)

    class Meta:
        model = Ticket
        fields = ['id', 'date', 'client', 'items', 'payment_type', 'service_type', 'payment_cash', 'payment_qr', 'payment_card', 'total_canceled', 'total_amount', 'change',]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        ticket = Ticket.objects.create(**validated_data)
        for item_data in items_data:
            TicketItem.objects.create(ticket=ticket, **item_data)
        return ticket
