from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from django_filters import rest_framework as filters

from todoapp.models import Project, Todo
from todoapp.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectPaginatorLimit(LimitOffsetPagination):
    default_limit = 10


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPaginatorLimit
    filterset_class = ProjectFilter


class TodoPaginatorLimit(LimitOffsetPagination):
    default_limit = 10


class TodoViewSet(ModelViewSet):

    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoPaginatorLimit
    filterset_fields = ['project']

    def perform_create(self, serializer):
        serializer.save(element_status=True)

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
