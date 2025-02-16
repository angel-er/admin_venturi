from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Client
from .serializers import ClientSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class ClientsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Client.objects.all().exists():
            clients = Client.objects.all()
            serializer = ClientSerializer(clients, many=True)
            return Response({'clients': serializer.data}, status=status.HTTP_200_OK)
        else:
           return Response({'error': 'No se encontraron resultados'}, status=status.HTTP_404_NOT_FOUND)
        
    
    def post(self, request, *args, **kwargs):
        try:
            serializer = ClientSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("ERROR SUCCES: ", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error",str(e))


class ClientDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def patch(self, request, pk=None):
        try:
            client = Client.objects.get(pk=pk)
            serializer = ClientSerializer(client, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error",str(e))
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk=None):
        try:
            client = get_object_or_404(Client, pk=pk)
            # serializer = ClientSerializer(client, data=request.data, partial=True)
            client.delete()
            return Response({"message": "Datos eliminados"}, status=status.HTTP_200_OK)
           
        except Exception as e:
            print("Error",str(e))
            return Response(client.errors, status=status.HTTP_404_NOT_FOUND)



