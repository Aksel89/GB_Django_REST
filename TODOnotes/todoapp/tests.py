from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from mixer.backend.django import mixer
from users.models import Users
from .models import Project, Todo
from .views import ProjectViewSet


class TestProjectViewSet(TestCase):

    def test_admin(self) -> None:
        self.admin = Users.objects.create_superuser('admin', 'admin@examle.com', '123')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project')
        force_authenticate(request, user=self.admin)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertSetEqual(response.status_code, status.HTTP_200_OK)

    def test_post_list(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/', {
            "id": 1,
            "name": 'Test',
            "repo_url": 'example.com',
            "users": [1]
        })
        force_authenticate(request, user=self.admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_todo(self):
        todo = mixer.blend(Todo)
        self.client.login(username='admin', password='123')
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
