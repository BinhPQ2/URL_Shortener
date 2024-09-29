from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Url
from django.utils import timezone
from datetime import timedelta

class UrlShortenerTests(APITestCase):
    
    def test_create_short_url(self):
        """Test if a short URL is created successfully"""
        url = 'https://www.example.com'
        response = self.client.post(reverse('shorten_url'), {'original_url': url})
        
        # Check that the URL was created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('short_code', response.data)
        self.assertIn('expiration_date', response.data)

    def test_duplicate_long_url_creates_new_short_code(self):
        """Test if duplicate long URLs create new short codes"""
        url = 'https://www.example.com'
        response1 = self.client.post(reverse('shorten_url'), {'original_url': url})
        response2 = self.client.post(reverse('shorten_url'), {'original_url': url})

        # Check that both responses have different short codes
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
        self.assertNotEqual(response1.data['short_code'], response2.data['short_code'])

    def test_redirect_url(self):
        """Test redirection for a valid short URL"""
        url_instance = Url.objects.create(original_url='https://www.google.com', short_code='abc123', expiration_date=timezone.now() + timedelta(minutes=5))
        response = self.client.get(reverse('redirect_url', args=['abc123']))
        
        # Check that it redirects to the correct URL
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)

    def test_expired_url(self):
        """Test if an expired short URL returns an error"""
        url_instance = Url.objects.create(original_url='https://www.google.com', short_code='abc123', expiration_date=timezone.now() - timedelta(minutes=1))
        response = self.client.get(reverse('redirect_url', args=['abc123']))
        
        # Check that the response returns a 410 Gone status
        self.assertEqual(response.status_code, status.HTTP_410_GONE)

    def test_invalid_short_code(self):
        """Test for invalid short code"""
        response = self.client.get(reverse('redirect_url', args=['invalidcode']))
        
        # Check that it returns 404 Not Found
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


# testing using CURL: 
# curl -X POST http://127.0.0.1:8000/api/shorten/ -H "Content-Type: application/json" -d "{\"original_url\": \"https://www.example.com\"}"
