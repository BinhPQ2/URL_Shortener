from django.db import models
import uuid

class Url(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=15, unique=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.original_url
