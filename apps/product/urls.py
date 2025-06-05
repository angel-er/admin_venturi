from django.urls import path
from .views import *

urlpatterns = [
    path('', ProductAPIView.as_view(), name='product'),
    path('detail/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]