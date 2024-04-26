from rest_framework import serializers
from .models import Notes,Subjects
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ["id","title","content","created_at","author","subject"]
        extra_kwargs = {"author":{"read_only":True}}

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = ["id","subject_name","subject_type","author"]
        extra_kwargs = {"author":{"read_only":True}}

