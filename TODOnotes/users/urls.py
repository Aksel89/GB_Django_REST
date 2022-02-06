from .views import UserViewSet
from django.urls import path

app_name = 'users'

urlpatterns = [
    path(r'', UserViewSet.as_view({'get': 'list'}))
]
