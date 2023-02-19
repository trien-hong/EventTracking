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

    class Meta:
        verbose_name_plural = "Events"        

class UserReviews(models.Model):
    event_id = models.TextField()
    title = models.TextField()
    userComment = models.TextField()
    userRating = models.TextField()
    date = models.DateTimeField(auto_now=True)
    isEdited = models.BooleanField(default=False)
    # event = models.ForeignKey(UserEvents, on_delete=models.CASCADE, default=None)
    # i believe it may be better to add Event as a foreignkey
    # instead of having to keep event_id & title i'll do this later
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, default=None)

    class Meta:
        verbose_name_plural = "Reviews"

class UserReplies(models.Model):
    reply = models.TextField()
    date = models.DateTimeField(auto_now=True)
    isEdited = models.BooleanField(default=False)
    review = models.ForeignKey(UserReviews, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, default=None)

    class Meta:
        verbose_name_plural = "Replies"