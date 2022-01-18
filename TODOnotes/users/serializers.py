from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Users


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'first_name', 'last_name', 'email']


class AppUserSerializerV2(ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser']
