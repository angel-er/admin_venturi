from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import action
from .models import *
from .serializers import FlavorSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class FlavorAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if IceCreamFlavor.objects.all().exists():
            flavors = IceCreamFlavor.objects.all()
            serializer = FlavorSerializer(flavors, many=True)
            return Response({'flavors': serializer.data}, status=status.HTTP_200_OK)
        else:
           return Response({'error': 'No se encontraron resultados'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, *args, **kwargs):
        try:
            serializer = FlavorSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("ERROR SUCCES: ", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error",str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def put(self, request, pk):
        ticket = IceCreamFlavor.objects.get(pk=pk)
        serializer = FlavorSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ProductDetailView(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def patch(self, request, pk=None):
#         try:
#             product = IceCreamFlavor.objects.get(pk=pk)
#             serializer = FlavorSerializer(product, data=request.data, partial=True)

#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             else:
#                 return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)
#         except Exception as e:
#             print("Error",str(e))
#             return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk=None):
#         try:
#             product = get_object_or_404(IceCreamFlavor, pk=pk)
#             product.delete()
#             return Response({"message": "Datos eliminados"}, status=status.HTTP_200_OK) 
#         except Exception as e:
#             print("Error",str(e))
#             return Response(product.errors, status=status.HTTP_404_NOT_FOUND)

