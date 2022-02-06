from base import *

DEBUG = False
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'TODOnotes',
        'USER': 'todoadmin',
        'PASSWORD': 'todo123',
        'HOST': 'db',
        'PORT': '5432'
    }
}
