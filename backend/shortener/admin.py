from django.contrib import admin
from .models import Url

class UrlAdmin(admin.ModelAdmin):
    list_display = ('original_url', 'short_code', 'created_at', 'expiration_date')

admin.site.register(Url, UrlAdmin)
