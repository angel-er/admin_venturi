from django.urls import path # manual - importar path
from . import views # manual - importar views

urlpatterns = [
   path('', views.sales_view, name='Sales'), # manual - agregar esta ruta
   path('clients/', views.clients_view, name='Clients'), # manual - agregar esta ruta
   # path('add-client/', views.add_client_view, name='AddClient'), # manual - agregar esta ruta
   # path('edit-client/', views.edit_client_view, name='EditClient'), # manual - agregar esta ruta
   # path('delete-client/', views.delete_client_view, name='DeleteClient'), # manual - agregar esta ruta
   # path('products/', views.products_view, name='Products'), # manual - agregar esta ruta
   # path('add-product/', views.add_product_view, name='AddProduct'), # manual - agregar esta ruta
   # path('edit-product/', views.edit_product_view, name='EditProduct'), # manual - agregar esta ruta
   # path('delete-product/', views.delete_product_view, name='DeleteProduct'), # manual - agregar esta ruta
   # path('add-sale/', views.add_sale_view.as_view(), name='AddSale'), # manual - agregar esta ruta
   # path('export/', views.export_pdf_view, name='ExportPDF'), # manual - agregar esta ruta
   # path('export/<id>/<iva>', views.export_pdf_view, name='ExportPDF'), # manual - agregar esta ruta
   
]