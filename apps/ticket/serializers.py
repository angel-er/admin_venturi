from .models import Detail, Ticket
from rest_framework import serializers

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detail
        fields = ['id', 'ticket', 'product', 'quantity_product', 'price_product', 'subtotal_product', 'created',]


class TicketSerializer(serializers.ModelSerializer):
    details = DetailSerializer(many=True)

    class Meta:
        model = Ticket
        fields = ['id', 'date', 'client', 'details', 'order_type', 'payment_cash', 'payment_qr', 'payment_card', 'total_canceled', 'total_amount', 'change',]

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        ticket = Ticket.objects.create(**validated_data)
        for detail_data in details_data:
            Detail.objects.create(ticket=ticket, **detail_data)
        ticket.calculate_total()
        ticket.calculate_total_canceled()
        ticket.calculate_change()
        return ticket
