from .serializers import TicketSerializer, TicketItemSerializer
from .models import Ticket, TicketItem
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView

# Create your views here.
class TicketAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, pk=None):
        if pk:
            ticket = Ticket.objects.get(pk=pk)
            serializer = TicketSerializer(ticket)
        else:
            tickets = Ticket.objects.all()
            serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Serializa los datos recibidos
        serializer = TicketSerializer(data=request.data)
        # Valida los datos
        if serializer.is_valid():
            # Guarda el ticket y los items
            serializer = serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        ticket = Ticket.objects.get(pk=pk)
        serializer = TicketSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer)
        return Response(serializer, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ticket = Ticket.objects.get(pk=pk)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class TicketItemAPIView(RetrieveUpdateDestroyAPIView):
    def get(self, request, pk=None):
        if pk:
            ticket_item = TicketItem.objects.get(pk=pk)
            serializer = TicketItemSerializer(ticket_item)
        else:
            ticket_items = TicketItem.objects.all()
            serializer = TicketItemSerializer(ticket_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TicketItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        ticket_item = TicketItem.objects.get(pk=pk)
        serializer = TicketItemSerializer(ticket_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ticket_item = TicketItem.objects.get(pk=pk)
        ticket_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
