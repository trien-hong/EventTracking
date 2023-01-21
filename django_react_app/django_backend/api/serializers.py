from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from . models import UserEvents
from . models import UserReviews

class UserEventsSerializer(ModelSerializer):
    class Meta:
        model = UserEvents
        fields = "__all__"

class GetReviewsSerializer(ModelSerializer):
    class Meta:
        model = UserReviews
        fields = "__all__"

class GetProfilePictureSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["profile_picture"]