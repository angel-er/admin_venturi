from django.urls import path
from .views import *

urlpatterns = [
    path('', TicketAPIView.as_view(), name='ticket-list'),
    path('<int:pk>/', TicketAPIView.as_view(), name='ticket-detail'),
    path('items/', TicketItemAPIView.as_view(), name='ticket-item-list'),
    path('items/<int:pk>/', TicketItemAPIView.as_view(), name='ticket-item-detail'),
]