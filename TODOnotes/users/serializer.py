from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Users


class AppUserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
