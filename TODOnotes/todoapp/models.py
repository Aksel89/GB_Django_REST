from django.db import models
from users.models import Users


class Project(models.Model):
    name = models.CharField(verbose_name='Project Name', max_length=64, unique=True)
    repo_url = models.URLField(verbose_name='Repository link', blank=True)
    users = models.ManyToManyField(Users)

    def __str__(self):
        return f'Project: {self.name}'


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    note = models.TextField(verbose_name='TODO text')
    create_date = models.DateTimeField(verbose_name='Create date', auto_now_add=True)
    update_date = models.DateTimeField(verbose_name='Update date', auto_now=True)
    users = models.ManyToManyField(Users)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f'Todo for {self.project}: {self.note}, create_date: {self.create_date}'
