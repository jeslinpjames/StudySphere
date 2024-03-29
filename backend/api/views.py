from django.shortcuts import render
from rest_framework import generics
# from  .models import UserData
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

# class UserDataList(generics.ListCreateAPIView):
#     queryset = UserData.objects.all()
#     serializer_class = UserSerializer
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]