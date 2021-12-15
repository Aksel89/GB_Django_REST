from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializer import AppUserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AppUserSerializer
