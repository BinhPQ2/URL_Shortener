from django.test import TestCase
from .models import Url

class UrlModelTest(TestCase):
    def setUp(self):
        self.url = Url.objects.create(original_url='https://www.example.com')

    def test_url_creation(self):
        self.assertEqual(self.url.original_url, 'https://www.example.com')
        self.assertTrue(len(self.url.short_code) > 0)

# testing using CURL: 
# curl -X POST http://127.0.0.1:8000/api/shorten/ -H "Content-Type: application/json" -d "{\"original_url\": \"https://www.example.com\"}"
