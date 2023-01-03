from rest_framework.serializers import ModelSerializer
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