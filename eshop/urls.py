"""eshop URL Configuration"""

from django.contrib import admin
from django.http import HttpResponse
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

def home(request):
    return HttpResponse('RDSHOP Running Succefully')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/login/',obtain_auth_token),
    # path('',TemplateView.as_view(template_name='index.html')),
    path('',home),
    path('api/',include('shop.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += [
#     re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
# ]