from rest_framework.serializers import ModelSerializer
from . models import Profile

# NEED TO COMPLETE

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"