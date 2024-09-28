from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Url
from .serializers import UrlSerializer
from django.shortcuts import redirect

@api_view(['POST'])
def shorten_url(request):
    if request.method == 'POST':
        original_url = request.data.get('original_url')

        # Check if the URL already exists
        existing_url = Url.objects.filter(original_url=original_url).first()
        
        if existing_url:
            # Check if it has expired
            if existing_url.expiration_date and existing_url.expiration_date > timezone.now():
                return Response({'original_url': existing_url.original_url, 'short_code': existing_url.short_code}, status=200)
            else:
                # If expired, delete and create a new one
                existing_url.delete()

        # Create a new shortened URL
        serializer = UrlSerializer(data=request.data)
        if serializer.is_valid():
            url_instance = serializer.save()
            return Response({
                'original_url': url_instance.original_url,
                'short_code': url_instance.short_code
            }, status=201)

        return Response(serializer.errors, status=400)

@api_view(['GET'])
def redirect_url(request, short_code):
    try:
        url = Url.objects.get(short_code=short_code)
        
        # Check for expiration
        if url.expiration_date and url.expiration_date < timezone.now():
            return Response({"error": "This link has expired."}, status=410)  # HTTP 410 for expired resource
        
        return redirect(url.original_url)  # Redirect to the original URL
    except Url.DoesNotExist:
        return Response(status=404)  # URL not found
