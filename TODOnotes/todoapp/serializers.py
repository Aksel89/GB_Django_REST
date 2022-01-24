from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework.relations import StringRelatedField

from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    project = StringRelatedField(many=False)

    class Meta:
        model = Todo
        fields = ['id', 'project', 'note', 'create_date', 'user', 'is_active']
