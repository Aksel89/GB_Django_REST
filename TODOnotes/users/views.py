from rest_framework.permissions import DjangoModelPermissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from .models import Users
from .serializers import AppUserSerializer, AppUserSerializerV2


class UserViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, GenericViewSet):

    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Users.objects.all()
    serializer_class = AppUserSerializer
    permission_classes = [DjangoModelPermissions]

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return AppUserSerializerV2
        return AppUserSerializer
