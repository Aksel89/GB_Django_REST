from dev import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'TODOnotes',
        'USER': 'todoadmin',
        'PASSWORD': 'todo123',
        'HOST': '127.0.0.1',
        'PORT': '54325'
    }
}
