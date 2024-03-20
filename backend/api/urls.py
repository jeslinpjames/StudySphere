from django.urls import path
from . import views

urlpatterns = [
    path("userdata/",views.UserDataList.as_view(),name="user-data")
]
 