from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class UserEvents(models.Model):
    event_id = models.TextField()
    title = models.TextField()
    date = models.TextField()
    city = models.TextField()
    imageUrl = models.TextField()
    minPrice = models.TextField()
    maxPrice = models.TextField()
    username = models.TextField()

class User(AbstractUser):
    zip_code = models.CharField(max_length=5)