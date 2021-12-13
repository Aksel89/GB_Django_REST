from rest_framework.viewsets import ModelViewSet
from .models import Users
from .serializer import AppUserSerializer


class UserViewSet(ModelViewSet):

    queryset = Users.objects.all()
    serializer_class = AppUserSerializer
