from django.db import models
from django.utils import timezone
import string
import random
from datetime import timedelta

class Url(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=6, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.short_code:
            self.short_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        
        # Set expiration date if not already set
        if not self.expiration_date:
            self.expiration_date = timezone.now() + timedelta(seconds=5)
        
        super(Url, self).save(*args, **kwargs)

    def __str__(self):
        return self.original_url
