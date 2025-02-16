from django.urls import path
from .views import *

urlpatterns = [
    path('', ClientsView.as_view(), name='clients'),
    path('detail/<int:pk>/', ClientDetailView.as_view(), name='detail'),
    # path('create/', CreateClientView.as_view(), name='create')
]