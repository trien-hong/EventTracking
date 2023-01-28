from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer
from django.contrib.auth import get_user_model
from . models import UserEvents
from . models import UserReviews

class UserEventsSerializer(ModelSerializer):
    class Meta:
        model = UserEvents
        fields = "__all__"

class GetReviewsSerializer(HyperlinkedModelSerializer):
    username = serializers.CharField(source="user.username")
    profile_picture = serializers.CharField(source="user.profile_picture")

    class Meta:
        model = UserReviews
        fields = ["username", "profile_picture", "id", "event_id", "title", "userComment", "userRating", "dateAdded"]

class GetProfilePictureSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["profile_picture"]