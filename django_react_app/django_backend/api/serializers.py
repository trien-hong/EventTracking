from PIL import Image
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer
from . models import UserEvents
from . models import UserReviews
from . models import UserReplies
from django.contrib.auth import get_user_model
User = get_user_model()


class SignupValidateSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)
    zip_code = serializers.CharField(required=True)

    def validate(self, data):
        errors = []

        # validate username
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

class UpdateUserInfoValidateSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(required=False, allow_blank=True)
    confirm_password = serializers.CharField(required=False, allow_blank=True)
    zip_code = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        errors = []

        # validate username
        if User.objects.filter(username=data["username"]).exists():
            errors.append({"username" : "Username already exist."})
        
        # validate password and confirm_password
        if data["password"] != data["confirm_password"]:
            errors.append({"passwords": "Passwords do not match."})

        # validate zip_code
        if len(data["zip_code"]) != 5 and data["zip_code"] != "":
            errors.append({"zip_code": "ZIP code needs to be 5 numeric (0-9) characters in length."})
        elif data["zip_code"].isnumeric() == False and data["zip_code"] != "":
            errors.append({"zip_code": "ZIP code can only contain 5 numeric (0-9) characters."})

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
class CheckFileValidateSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)

    def validate(self, data):
        errors = []

        # validate file type
        try:
            Image.open(data["file"])
        except:
            ext = data["file"].name.split(".")[-1]
            errors.append({"file_type": "File type of \"." + ext + "\" is not supported."})

        # validate file size (size > 5MB)
        # note that nginx will block files larger than 100MB
        # in terms of UX design there's a 95MB buffer to at least let the user know of the error from the back-end
        # i could also do this on the front-end but i should validate files on the back-end
        if data["file"].size > 5*1024*1024:
            errors.append({"file_size": "File size is greater than 5MB."})

        if errors:
            raise serializers.ValidationError(errors)

        return data
    
class ResetPasswordValidateSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        errors = []

        # validate username
        if User.objects.filter(username=data["username"]).exists() == False:
            errors.append({"username" : "Username does not exist."})

        # validate password
        if data["password"] != data["confirm_password"]:
            errors.append({"passwords": "Passwords do not match."})

        if errors:
            raise serializers.ValidationError(errors)
        
        return data

class UserEventsSerializer(ModelSerializer):
    class Meta:
        model = UserEvents
        fields = "__all__"

class GetReplies(HyperlinkedModelSerializer):
    date = serializers.DateTimeField(format="%m-%d-%Y @ %H:%M:%S UTC")
    username = serializers.CharField(source="user.username")
    profile_picture = serializers.CharField(source="user.profile_picture")

    class Meta:
        model = UserReplies
        fields = ["username", "profile_picture", "id", "reply", "date", "isEdited"]

class GetReviewsSerializer(HyperlinkedModelSerializer):
    date = serializers.DateTimeField(format="%m-%d-%Y @ %H:%M:%S UTC")
    username = serializers.CharField(source="user.username")
    profile_picture = serializers.CharField(source="user.profile_picture")
    replies = GetReplies(many=True, source="userreplies_set")

    class Meta:
        model = UserReviews
        fields = ["username", "profile_picture", "id", "event_id", "title", "userComment", "userRating", "date", "isEdited", "replies"]

class GetProfilePictureSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_picture"]

class EditedReviewSerializer(ModelSerializer):
    date = serializers.DateTimeField(format="%m-%d-%Y @ %H:%M:%S UTC")

    class Meta:
        model = UserReviews
        fields = ["userComment", "userRating", "date", "isEdited"]

class EditedReplySerializer(ModelSerializer):
    date = serializers.DateTimeField(format="%m-%d-%Y @ %H:%M:%S UTC")

    class Meta:
        model = UserReplies
        fields = ["reply", "date", "isEdited"]