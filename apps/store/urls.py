from django.urls import path
from .views import *

urlpatterns = [
    path('', StoresView.as_view(), name='store'),
    # path('detail/<int:pk>/', ProductDetailView.as_view(), name='detail-product'),
]