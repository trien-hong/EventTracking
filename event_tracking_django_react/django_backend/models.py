from django.db import models

# Create your models here.

class Profile(models.Model):
    event_id = models.TextField()
    event_title = models.TextField()
    event_image_url = models.TextField()