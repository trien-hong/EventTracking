from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model

# Create your models here.

class User(AbstractUser):
    zip_code = models.CharField(max_length=5)
    profile_picture = models.ImageField(upload_to="profile_pictures", null=True, blank=True)
    
class UserEvents(models.Model):
    event_id = models.TextField()
    title = models.TextField()
    date = models.TextField()
    city = models.TextField()
    imageUrl = models.TextField()
    minPrice = models.TextField()
    maxPrice = models.TextField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, default=None)

class UserReviews(models.Model):
    event_id = models.TextField()
    title = models.TextField()
    userComment = models.TextField()
    userRating = models.TextField()
    dateAdded = models.DateField(auto_now_add=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, default=None)