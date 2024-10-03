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
            self.short_code = self.generate_unique_short_code()

        if not self.expiration_date:
            self.expiration_date = timezone.now() + timedelta(seconds=60)

        super(Url, self).save(*args, **kwargs)

    def generate_unique_short_code(self):
        """Generate a unique 6-character short code."""
        while True:
            short_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
            if not Url.objects.filter(short_code=short_code).exists():
                break  # Check if the generated short code already exists in the database. If unique, exit the loop and return the short code
        return short_code

    def __str__(self):
        return self.original_url
