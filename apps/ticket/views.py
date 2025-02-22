from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import DetailSerializer, TicketSerializer
from .models import Ticket

# Create your views here.
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    @action(detail=False, methods=['post'])
    def create_ticket(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ticket = serializer.save()
        return render(TicketSerializer(ticket).data)
