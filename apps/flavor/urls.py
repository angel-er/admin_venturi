from django.urls import path
from .views import *

urlpatterns = [
    path('', FlavorAPIView.as_view(), name='flavor-list'),
    path('<int:pk>/', FlavorAPIView.as_view(), name='flavor-detail'),
]