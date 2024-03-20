from django.shortcuts import render
from rest_framework import generics
from  .models import UserData
from .serializers import UserDataSerializer
# Create your views here.

class UserDataList(generics.ListCreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    

