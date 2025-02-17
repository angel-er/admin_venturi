from django.urls import path
from .views import *

urlpatterns = [
    path('', ProductsView.as_view(), name='product'),
    path('detail/<int:pk>/', ProductDetailView.as_view(), name='detail-product'),
]