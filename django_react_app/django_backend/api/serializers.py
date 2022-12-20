from rest_framework.serializers import ModelSerializer
from . models import UserEvents

# NEED TO COMPLETE

class UserEventsSerializer(ModelSerializer):
    class Meta:
        model = UserEvents
        fields = "__all__"