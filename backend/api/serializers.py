from rest_framework import serializers
# from .models import UserData
from django.contrib.auth.models import User

# class UserDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserData
#         fields = ["user_name", "password", "user_id", "email"]
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