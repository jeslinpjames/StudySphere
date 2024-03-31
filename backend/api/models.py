from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
# Create your models here.
# class UserData(models.Model):
#     user_name = models.CharField(max_length=100)
#     password = models.CharField(max_length=100)  
#     user_id = models.AutoField(primary_key=True)  
#     email = models.EmailField(unique=True)  

#     def __str__(self) -> str:
#       return f"{self.user_name} , {self.user_id} , {self.email}"
class Notes(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextFielde()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="notes")

    def __str__(self):
        return self.title
