from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Store
from .serializers import StoreSerializer
from django.shortcuts import get_object_or_404
# Create your views here.
class StoresView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Store.objects.all().exists():
            stores = Store.objects.all()
            serializer = StoreSerializer(stores, many=True)
            return Response({'stores': serializer.data}, status=status.HTTP_200_OK)
        else:
           return Response({'error': 'No se encontraron resultados'}, status=status.HTTP_404_NOT_FOUND)
        
    
    def post(self, request, *args, **kwargs):
        try:
            serializer = StoreSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("ERROR SUCCES: ", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error",str(e))