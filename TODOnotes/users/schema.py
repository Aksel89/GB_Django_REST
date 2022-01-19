import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, Todo
from .models import Users


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_project(root, info):
        return Project.object.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todo(root, info):
        return Todo.object.all()

    all_users = graphene.List(UserType)

    def resolve_all_user(root, info):
        return Users.object.all()

    user_by_name = graphene.Field(UserType, name=graphene.Int(required=True))

    def resolve_user_by_id(root, info, name):
        try:
            return Users.objects.get(name=name)
        except Users.DoesNotExist:
            return None

    project_by_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_project_by_name(root, info, name):
        project = Project.objects.all()
        if name:
            project = project.filter(name=name)
        return project

schema = graphene.Schema(query=Query)
