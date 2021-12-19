from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework.relations import StringRelatedField

from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = StringRelatedField(many=True)

    class Meta:
        model = Todo
        fields = '__all__'
