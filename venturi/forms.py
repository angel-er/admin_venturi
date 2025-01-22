from django import forms
from .models import Client

################## CLIENT ########################
class AddClientForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = ('name', 'email', 'telephone')
        labels = {
            'name': 'Nombre Cliente:',
            'email': 'Email:',
            'telephone': 'Teléfono (Contacto):',
        }

class EditClientForm(forms.ModelForm):
    class Meta:
        model = Client
        fields = ('name', 'email', 'telephone')
        labels = {
            'name': 'Nombre:',
            'email': 'Email:',
            'telephone': 'Telefono:',
        }
        widgets = {
            'code': forms.TextInput(attrs={'type': 'text', 'id': 'code_edit'}),
            'name': forms.TextInput(attrs={'id': 'name_edit'}),
            'telephone': forms.TextInput(attrs={'id': 'telephone_edit'}),
        }

############### PRODUCT ###########################
# class AddProductForm(forms.ModelForm):
#     class Meta:
#         model = Product
#         # fields = ('code', 'title', 'description', 'price', 'quantity', 'image',)
#         fields = '__all__'
#         labels = {
#             'code': 'Código:',
#             'title': 'Nombre (Producto):',
#             'description': 'Descripción (Producto):',
#             'price': 'Precio:',
#             'quantity': 'Cantidad:',
#             'image': 'Imagen (Producto)',
#         }

# class EditProductForm(forms.ModelForm):
#     class Meta:
#         model = Product
#         fields = ('code', 'title', 'description', 'price', 'quantity', 'image')
#         labels = {
#             'code': 'Código:',
#             'title': 'Titulo:',
#             'description': 'Descripción:',
#             'price': 'Precio:',
#             'quantity': 'Cantidad:',
#             'image': 'Imagen:',
#         }
#         widgets = {
#             'code': forms.TextInput(attrs={'type': 'text', 'id': 'code_edit'}),
#             'title': forms.TextInput(attrs={'id': 'title_edit'}),
#             'description': forms.TextInput(attrs={'id': 'description_edit'}),
#             'price': forms.TextInput(attrs={'id': 'price_edit'}),
#             'quantity': forms.TextInput(attrs={'id': 'quantity_edit'}),
#             'image': forms.FileInput(attrs={'id': 'image_edit'}),
#         }