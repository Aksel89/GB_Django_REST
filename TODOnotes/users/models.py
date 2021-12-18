from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)
    position = models.CharField(max_length=100, blank=False)
