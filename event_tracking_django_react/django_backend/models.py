from django.db import models

# Create your models here.

class Profile(models.Model):
    event_id = models.TextField()
    title = models.TextField()
    date = models.TextField()
    imageUrl = models.TextField()
    minPrice = models.TextField()
    maxPrice = models.TextField()