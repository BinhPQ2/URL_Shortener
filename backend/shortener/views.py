from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Url
from .serializers import UrlSerializer

@api_view(['POST'])
def shorten_url(request):
    if request.method == 'POST':
        serializer = UrlSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def redirect_url(request, short_code):
    try:
        url = Url.objects.get(short_code=short_code)
        return Response({'original_url': url.original_url}, status=status.HTTP_302_FOUND)
    except Url.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
