from rest_framework import serializers
from .models import *

class FlavorSerializer(serializers.ModelSerializer):
    class Meta:
        model=IceCreamFlavor
        fields='__all__'