import os
import json
import uuid
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .views_auth import get_new_token
from ..models import UserEvents
from ..models import UserReviews
from .. import serializers
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
User = get_user_model()

@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def profileEvents(request):
    """
    Endpoint: /api/profile/events/
    """
    if request.method == "GET":
        user = request.user
        data = UserEvents.objects.all().filter(user=user.id)
        serializer = serializers.UserEventsSerializer(data, many=True)
        if serializer.data != []:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        data = json.loads(request.body)
        if UserEvents.objects.all().filter(user=user.id, event_id=data["event_id"]).exists() == False:
            event = UserEvents(event_id=data["event_id"], title=data["title"], date=data["date"], city=data["city"], imageUrl=data["imageUrl"], minPrice=data["minPrice"], maxPrice=data["maxPrice"], user=user)
            event.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_409_CONFLICT)
    
    if request.method == "DELETE":
        user = request.user
        data = json.loads(request.body)
        if UserEvents.objects.all().filter(user=user.id, event_id=data["event_id"]).exists():
            event = UserEvents.objects.get(user=user.id, event_id=data["event_id"])
            event.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profileReview(request):
    """
    Endpoint: /api/profile/reviews/
    """
    user = request.user
    reviews = UserReviews.objects.all().filter(user=user.id).order_by("id")
    serializer = serializers.UserReviewsSerializer(reviews, many=True)
    if serializer.data != []:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def profileSettingsPicture(request):
    """
    Endpoint: /api/profile/settings/picture/
    """
    if request.method == "GET":
        user = User.objects.get(username=request.user)
        serializer = serializers.UserProfilePictureSerializer(user, many=False)
        if serializer.data["profile_picture"] != None and os.path.exists(user.profile_picture.path):
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == "PUT":
        file = request.FILES
        serializer = serializers.CheckFileValidateSerializer(data=file)
        if serializer.is_valid():
            ext = serializer.validated_data["file"].name.split(".")[-1]
            serializer.validated_data["file"].name = str(request.user) + "_profile_picture_id_" + str(uuid.uuid4())[:8] + "." + ext
            user = User.objects.get(username=request.user)
            user.profile_picture.delete()
            user.profile_picture = serializer.validated_data["file"]
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            # status code 415 (UNSUPPORTED_MEDIA_TYPE) and or 413 (REQUEST_ENTITY_TOO_LARGE) would work
            # my problem is that it is one of the two OR both. i'll choose 400 for now.
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        user = User.objects.get(username=request.user)
        if os.path.exists(user.profile_picture.path):
            user.profile_picture.delete()
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def profileSettingsInfo(request):
    """
    Endpoint: /api/profile/settings/info/
    """
    # i am well aware of the flaw that the previous refresh token is still active (until it expires)
    # that refresh token may still be used to generate a new access token
    user = User.objects.get(id=request.user.id)
    data = json.loads(request.body)
    serializer = serializers.UpdateUserInfoValidateSerializer(data=data)
    old_email = ""
    if serializer.is_valid():
        if(serializer.validated_data["email"] != ""):
            old_email = user.email
            new_email = serializer.validated_data["email"]
            user.email = new_email
            user.save()
        if(serializer.validated_data["username"] != ""):
            user.username = serializer.validated_data["username"]
            user.save()
        if(serializer.validated_data["password"] != "" and serializer.validated_data["confirm_password"] != ""):
            user.set_password(serializer.validated_data["confirm_password"])
            user.save()
        if(serializer.validated_data["zip_code"] != ""):
            user.zip_code = serializer.validated_data["zip_code"]
            user.save()
        new_token = get_new_token(user, serializer.validated_data["username"])
        if old_email == "":
            send_mail(
                "Account Information Change",
                "Your account information has changed. If this was indeed yourself, you can ignore this.",
                None,
                [user.email],
                fail_silently=False,
                html_message = render_to_string("../email_templates/account_info_change.html", {"username": user.username, "failed": False})
            )
        else:
            send_mail(
                "Account Information Change",
                "Your account information has changed. If this was indeed yourself, you can ignore this.",
                None,
                [user.email, old_email],
                fail_silently=False,
                html_message = render_to_string("../email_templates/account_info_change.html", {"username": user.username, "failed": False})
            )
        return Response(new_token, status=status.HTTP_200_OK)
    else:
        send_mail(
            "Attempt at Account Information Change",
            "Attempt at changing your account information has failed. If this was not you, you should immediately take steps to secure your account.",
            None,
            [user.email],
            fail_silently=False,
            html_message = render_to_string("../email_templates/account_info_change.html", {"username": user.username, "failed": True})
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def resetPassword(request):
    """
    Endpoint: /api/reset/password/
    """
    # i am well aware of the flaw that the previous refresh token is still active (until it expires)
    # that refresh token may still be used to generate a new access token
    data = json.loads(request.body)
    serializer = serializers.ResetPasswordValidateSerializer(data=data)
    if serializer.is_valid():
        # obviously you shouldn't be able to reset a password just because you know a username
        # there should be some secondary method of verifiction (such as email i'll find a way to do this later)
        user = User.objects.get(username=data["username"])
        user.set_password(serializer.validated_data["confirm_password"])
        user.save()
        send_mail(
            "Account Information Change",
            "Your account information has changed. If this was indeed yourself, you can ignore this.",
            None,
            [user.email],
            fail_silently=False,
            html_message = render_to_string("../email_templates/account_info_change.html", {"username": user.username, "failed": False})
        )
        return Response(status=status.HTTP_200_OK)
    else:
        try:
            user = User.objects.get(username=data["username"])
            send_mail(
                "Attempt at Account Information Change",
                "Attempt at changing your account information has failed. If this was not you, you should immediately take steps to secure your account.",
                None,
                [user.email],
                fail_silently=False,
                html_message = render_to_string("../email_templates/account_info_change.html", {"username": user.username, "failed": True})
            )
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
