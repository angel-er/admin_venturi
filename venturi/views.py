from pyexpat.errors import messages
from django.shortcuts import render, redirect
from .models import Client
# from .forms import AddClientForm, EditClientForm
# from django.contrib import messages
# from django.views.generic import ListView
# from django.http import JsonResponse, HttpResponse
from weasyprint.text.fonts import FontConfiguration
from django.template.loader import get_template
from weasyprint import HTML, CSS
from django.conf import settings
from datetime import datetime
import os
import json

# Create your views here.
def sales_view(request):
    sales = []
    num_sales = len(sales)
    context = {
        'sales': 'sales',
        'num_sales': num_sales
    }
    return render(request, 'sales.html', context)

def clients_view(request):
    clients = Client.objects.all()
    # form_add_client = AddClientForm()
    # form_edit_client = EditClientForm()

    context = {
        'clients': clients,
        # 'form_add': form_add_client,
        # 'form_edit': form_edit_client,
    }

    return render(request, 'clients.html', context)

# def add_client_view(request):
#     if request.POST:
#         form = AddClientForm(request.POST, request.FILES)
#         if form.is_valid():
#             try:
#                 form.save()
#             except:
#                 messages(request, "Error al guardar el cliente")
#                 return redirect('Clients')

#     return redirect('Clients')

# def edit_client_view(request):
#     if request.POST:
#         client = Client.objects.get(pk=request.POST.get('id_client_edit'))
#         form = EditClientForm(request.POST, request.FILES, instance=client)
#         if form.is_valid():
#             try:
#                 form.save()
#             except:
#                 messages(request, "Error al guardar el cliente")
#                 return redirect('Clients')

#     return redirect('Clients')

# def delete_client_view(request):
#     print(request)
#     if request.POST:
#         client = Client.objects.get(pk=request.POST.get('id_client_delete'))
#         client.delete()
#     return redirect('Clients')


# ################# PRODUCT ##############################
# def products_view(request):
#     products = Product.objects.all()
#     form_add_product = AddProductForm()
#     form_edit_product = EditProductForm()

#     context = {
#         'products': products,
#         'form_add': form_add_product,
#         'form_edit': form_edit_product,
#     }

#     return render(request, 'products.html', context)

# def add_product_view(request):
#     if request.POST:
#         form = AddProductForm(request.POST, request.FILES)
#         if form.is_valid():
#             try:
#                 form.save()
#             except:
#                 messages(request, "Error al guardar el producto")
#                 return redirect('Products')

#     return redirect('Products')

# def edit_product_view(request):
#     if request.POST:
#         product = Product.objects.get(pk=request.POST.get('id_product_edit'))
#         form = EditProductForm(request.POST, request.FILES, instance=product)
#         if form.is_valid():
#             try:
#                 form.save()
#             except:
#                 messages(request, "Error al guardar el producto")
#                 return redirect('Products')

#     return redirect('Products')

# def delete_product_view(request):
#     if request.POST:
#         product = Product.objects.get(pk=request.POST.get('id_product_delete'))
#         product.delete()
#     return redirect('Products')


# class add_sale_view(ListView):
#     template_name = 'add_ventas.html'
#     model = Output

#     def dispatch(self,request,*args,**kwargs):
#         return super().dispatch(request, *args, **kwargs)
#     """
#     def get_queryset(self):
#         return ProductosPreventivo.objects.filter(
#             preventivo=self.kwargs['id']
#         )
#     """
#     def post(self, request,*ars, **kwargs):
#         data = {}
#         try:
#             action = request.POST['action']
#             if action == 'autocomplete':
#                 data = []
#                 for i in Product.objects.filter(descripcion__icontains=request.POST["term"])[0:10]:
#                     item = i.toJSON()
#                     item['value'] = i.description
#                     data.append(item)
#             elif action == 'save':
#                 total_pay = float(request.POST["efectivo"]) + float(request.POST["tarjeta"]) +float(request.POST["transferencia"]) + float(request.POST["vales"]) + float(request.POST["otro"])
#                 date = request.POST["fecha"]
#                 id_client = int(request.POST["id_client"])
#                 client_obj = Client.objects.get(pk=id_client)
#                 data = json.loads(request.POST["verts"])
#                 total_sale = float(data["total"])
#                 ticket_num = request.POST["ticket"]
#                 if ticket_num == 1:
#                     ticket = True
#                 else:
#                     ticket = False
#                 break_down = int(request.POST["desglosar"])
#                 if break_down == 0:
#                     break_down = False
#                 elif break_down == 1:
#                     break_down = True

#                 comment = request.POST["comentarios"]
#                 new_sale = Output(order_date=date, client=client_obj, total=total_sale, paid=total_pay, comment=comment, ticket=ticket, break_down=break_down)
#                 new_sale.save()
#             else:
#                 data['error'] = "Ha ocurrido un error"
#         except Exception as e:
#             data['error'] = str(e)

#     #     return JsonResponse(data,safe=False)
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["products_list"] = Product.objects.all()
#         context["clients_list"] = Client.objects.all()
#         context["currency"] = "Bs. "
#         context["today"] = f"{datetime.now().year}-{datetime.now().month}-{datetime.now().day}"
#         return context

# def export_pdf_view(request, id, iva):
#     #print(id)
#     template = get_template("ticket.html")
#     #print(id)
#     subtotal = 0
#     iva_suma = 0

#     venta = Output.objects.get(pk=float(id))
#     datos = ProductOutput.objects.filter(output=venta)
#     for i in datos:
#         subtotal = subtotal + float(i.subtotal)
#         iva_suma = iva_suma + float(i.iva)

#     empresa = "VENTURI"
#     context ={
#         'num_ticket': id,
#         'iva': iva,
#         'fecha': venta.order_date,
#         'cliente': venta.client.name,
#         'items': datos,
#         'total': venta.total,
#         'empresa': empresa,
#         'comentarios': venta.comment,
#         'subtotal': subtotal,
#         'iva_suma': iva_suma,
#     }
#     html_template = template.render(context)
#     response = HttpResponse(content_type="application/pdf")
#     response["Content-Disposition"] = "inline; ticket.pdf"
#     css_url = os.path.join(settings.BASE_DIR,'index\static\index\css/bootstrap.min.css')
#     #HTML(string=html_template).write_pdf(target="ticket.pdf", stylesheets=[CSS(css_url)])

#     font_config = FontConfiguration()
#     HTML(string=html_template, base_url=request.build_absolute_uri()).write_pdf(target=response, font_config=font_config,stylesheets=[CSS(css_url)])

#     return response