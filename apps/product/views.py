from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import get_object_or_404

# Create your views here.
class ProductsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Product.objects.all().exists():
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response({'products': serializer.data}, status=status.HTTP_200_OK)
        else:
           return Response({'error': 'No se encontraron resultados'}, status=status.HTTP_404_NOT_FOUND)
        
    
    def post(self, request, *args, **kwargs):
        try:
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print("ERROR SUCCES: ", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error",str(e))


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def patch(self, request, pk=None):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)

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
            product = get_object_or_404(Product, pk=pk)
            # serializer = ClientSerializer(client, data=request.data, partial=True)
            product.delete()
            return Response({"message": "Datos eliminados"}, status=status.HTTP_200_OK)
           
        except Exception as e:
            print("Error",str(e))
            return Response(product.errors, status=status.HTTP_404_NOT_FOUND)



