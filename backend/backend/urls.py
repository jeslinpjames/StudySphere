from django.urls import path,include
from django.contrib import admin
# from . import views
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path("admin/",admin.site.urls),
    path("api/user/register/",CreateUserView.as_view(),name="register"),
    path("api/token/",TokenObtainPairView.as_view(),name="get_token"),
    path("api/token/refresh/",TokenRefreshView.as_view(),name="refresh"),
    path("api-auth/",include("rest_framework.urls")),
    # import rest of apis from the other url 
    path("api/",include("api.urls")),
]
 