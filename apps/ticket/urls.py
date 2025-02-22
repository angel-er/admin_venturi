from django.urls import path
from .views import *

urlpatterns = [
    path('', TicketListAPIView.as_view(), name='ticket-list'),
    path('create/', TicketAPIView.as_view(), name='ticket-create'),
    path('detail/<int:pk>/', TicketDetailAPIView.as_view(), name='ticket-detail'),
]