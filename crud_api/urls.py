"""
URL configuration for crud_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include # manual - importar include
from django.conf import settings # manual - importar settings
from django.conf.urls.static import static # manual - importar static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('venturi.urls')), # manual - agregar esta ruta
    # path('', include('sales.urls')), # manual - agregar esta ruta
    # path('clients/', include('clients.urls')), # manual - agregar esta ruta
]

urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
