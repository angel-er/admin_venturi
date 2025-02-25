from rest_framework import serializers
from .models import TicketItem, Ticket
from apps.client.serializers import ClientSerializer
from apps.client.models import Client

class TicketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketItem
        fields = ['id','product', 'quantity', 'price', 'subtotal', 'created',]
        read_only_fields = ['ticket']
        # extra_kwargs = {
        #     'ticket': {'write_only': True}  # Excluye 'ticket' de la validación
        # }
class TicketSerializer(serializers.ModelSerializer):
    items = TicketItemSerializer(many=True)
    client = ClientSerializer(read_only=True)  # Solo lectura para la respuesta
    client_id = serializers.IntegerField(write_only=True)  # Solo escritura para la creación

    class Meta:
        model = Ticket
        fields = ['id', 'date','client', 'client_id', 'items', 'service_type', 'payment_cash', 'payment_qr', 'payment_card', 'total_canceled', 'total_amount', 'change',]

    def create(self, validated_data):
        # Extrae el client_id y elimínalo de validated_data
        client_id = validated_data.pop('client_id')
         # Extrae los ítems del JSON recibido
        items_data = validated_data.pop('items')
        # Obtén el cliente correspondiente
        client = Client.objects.get(id=client_id)
        # Crea el ticket con el cliente
        ticket = Ticket.objects.create(client=client, **validated_data)
        # Crea cada ítem y lo asocia al ticket
        for item_data in items_data:
            TicketItem.objects.create(ticket=ticket, **item_data)
        
         # Serializa el ticket antes de devolverlo
        serializer = TicketSerializer(ticket)
        return serializer # Devuelve los datos serializados
