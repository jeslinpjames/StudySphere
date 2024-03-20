from django.db import models

# Create your models here.
class UserData(models.Model):
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  
    user_id = models.AutoField(primary_key=True)  
    email = models.EmailField(unique=True)  

    def __str__(self) -> str:
      return f"{self.user_name} , {self.user_id} , {self.email}"
