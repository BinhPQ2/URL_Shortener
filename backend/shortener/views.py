from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Url
from .serializers import UrlSerializer
from django.shortcuts import redirect, render

# Home page view
def homepage(request):
    return render(request, 'homepage.html')

@api_view(['POST'])
def shorten_url(request):
    if request.method == 'POST':
        original_url = request.data.get('original_url')

        # Check if original_url is provided
        if not original_url:
            return Response({"error": "Original URL is required."}, status=400)

        # Create a new shortened URL without checking for duplicates
        data = {'original_url': original_url}

        serializer = UrlSerializer(data=data)
        if serializer.is_valid():
            url_instance = serializer.save()
            return Response({
                'original_url': url_instance.original_url,
                'short_code': url_instance.short_code,
                'expiration_date': url_instance.expiration_date
            }, status=201)

        return Response(serializer.errors, status=400)

@api_view(['GET'])
def redirect_url(request, short_code):
    try:
        url = Url.objects.get(short_code=short_code)

        # Check if the URL has expired
        if url.expiration_date and url.expiration_date < timezone.now():
            return render(request, 'error.html', {
                'title': 'Oops! This link has expired.',
                'message': "It looks like the link you're trying to access is no longer valid."
            }, status=status.HTTP_410_GONE)  # Render the error page for expired links

        return redirect(url.original_url)  # Redirect to the original URL

    except Url.DoesNotExist:
        return render(request, 'error.html', {
            'title': '404 Not Found',
            'message': "The URL you're trying to access does not exist."
        }, status=status.HTTP_404_NOT_FOUND)  # Render the error page for URL not found
