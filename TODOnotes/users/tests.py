from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from .models import Users
from .views import UserViewSet


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        admin = Users.objects.create_superuser('admin', 'admin@examle.com', '123')
        force_authenticate(request, admin)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
