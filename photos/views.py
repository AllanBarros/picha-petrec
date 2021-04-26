from rest_framework import generics, permissions
from .models import Photo
from django.db.models import Count
from picha.serializers import PhotoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response

class PhotosView(generics.ListCreateAPIView):
    queryset           = Photo.objects.all()
    serializer_class   = PhotoSerializer
    permission_classes = [permissions.AllowAny]


class PhotosCountView(APIView):
    permission_classes = [permissions.AllowAny]
    renderer_classes = [JSONRenderer]

    def get(self, request):
        
        content = {'Photos': 'Photos', 'Total':Photo.objects.all().count()}

        return Response(content)
