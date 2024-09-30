from django.contrib import admin
from django.urls import path, include
from shortener.views import homepage

urlpatterns = [
    path('', homepage, name='homepage'),
    path('admin/', admin.site.urls),
    path('api/', include('shortener.urls')),
]
