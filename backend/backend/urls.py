from django.contrib import admin
from django.urls import path, include
from shortener.views import homepage

urlpatterns = [ # Home page route
    path('admin/', admin.site.urls),
    path('api/', include('shortener.urls')),
    path('', homepage, name='homepage'),
]
