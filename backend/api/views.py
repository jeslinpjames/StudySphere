from django.shortcuts import render
from rest_framework import generics
from  .models import Notes,Subjects
from .serializers import UserSerializer,NoteSerializer,SubjectSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

    # user api view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# notes creation with authentication only
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# note deletion
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author = user)

# subject creation api
class SubjectListCreate(generics.ListCreateAPIView):
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        user = self.request.user
        return Subjects.objects.filter(author = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            # must add field to get subject from user and save it here 
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# subject deleteion api
class SubjectDelete(generics.DestroyAPIView):
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # subject = must get subject from user to delete that subject
        return Subjects.objects.filter(author = user)