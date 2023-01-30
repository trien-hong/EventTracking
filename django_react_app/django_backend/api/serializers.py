from PIL import Image
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer
from . models import UserEvents
from . models import UserReviews
from django.contrib.auth import get_user_model
User = get_user_model()


class SignUpValidateSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)
    zip_code = serializers.CharField(required=True)

    def validate(self, data):
        errors = []

        # Validate username
        if User.objects.filter(username=data["username"]).exists():
            errors.append({"username" : "Username already exist."})
        
        # validate password and confirm_password
        if data["password"] != data["confirm_password"]:
            errors.append({"passwords": "Passwords do not match."})

        # validate zip_code
        if len(data["zip_code"]) != 5:
            errors.append({"zip_code": "ZIP code needs to be 5 numeric (0-9) characters in length."})
        elif data["zip_code"].isnumeric() == False:
            errors.append({"zip_code": "ZIP code can only contain 5 numeric (0-9) characters."})

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
class CheckFileValidateSerializer(serializers.Serializer):
    # file = serializers.ImageField(required=True)
    file = serializers.FileField(required=True)

    def validate(self, data):
        errors = []

        # validate file type
        try:
            Image.open(data["file"])
        except:
            errors.append({"image_type": "File type is unsupported."})

        # validate file size (size > 5MB)
        if data["file"].size > 5*1024*1024:
            errors.append({"image_size": "Image size is greater than 5MB"})

        if errors:
            raise serializers.ValidationError(errors)
        
        return data


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