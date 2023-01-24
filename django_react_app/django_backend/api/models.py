from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# I know... this isn't the "best" model
# I would like to add ForeignKeys to help minimize similar data across different tables
# Mainly username and profile picture

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
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True, blank=True)

class UserReviews(models.Model):
    event_id = models.TextField()
    title = models.TextField()
    username = models.TextField()
    userRating = models.TextField()
    userComment = models.TextField()
    profilePictureLocation = models.TextField(null=True, blank=True)
    dateAdded = models.DateField(auto_now_add=True)