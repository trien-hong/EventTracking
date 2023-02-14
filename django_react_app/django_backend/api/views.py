import os
import json
import uuid
from third_party_apis import ticketmaster_api
from third_party_apis import openweathermap_api
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from . models import UserEvents
from . models import UserReviews
from . models import UserReplies
from . import serializers
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username
        token['zip_code'] = user.zip_code

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
    """
    Endpoints: /api/ or ""
    """
    routes = [
        {
            'Endpoint': '/api/signup/',
            'Method': ['POST'],
            'Restricted': False,
            'Description': {'POST': 'Signup a user and save their information inside the database'}
        },
        {
            'Endpoint': '/api/events/page/<str:page>/size/<str:size>/sort/<str:sort>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Returns an array of events based on the current logged in user zip code'}
        },
        {
            'Endpoint': '/api/events/search/input/<str:input>/page/<str:page>/size/<str:size>/sort/<str:sort>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Returns an array of events based on the input for searching events'}
        },
        {
            'Endpoint': '/api/events/details/id/<str:id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Returns a single event with even more details about it'}
        },
        {
            'Endpoint': '/api/events/weather/latitude/<str:latitude>/longitude/<str:longitude>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Returns a dictionary of weather details for events'}
        },
        {
            'Endpoint': '/api/user/reviews/',
            'Method': ['POST', 'PUT', 'DELETE'],
            'Restricted': True,
            'Description': {'POST': 'Saves reviews left by the user to the database',
                            'PUT': 'Updates the specific review left by a user',
                            'DELETE': 'Deletes the specific review left by the user'}
        },
        {
            'Endpoint': '/api/user/replies/',
            'Method': ['POST', 'PUT', 'DELETE'],
            'Restricted': True,
            'Description': {'POST': 'Saves replies left by the user to the database',
                            'PUT': 'Updates the specific reply left by a user',
                            'DELETE': 'Deletes the specific reply left by the user'}
        },
        {
            'Endpoint': '/api/reviews/get/event_id/<str:event_id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Return an array of reviews left by all users for that specific event'}
        },
        {
            'Endpoint': '/api/profile/events/',
            'Method': ['GET', 'POST', 'DELETE'],
            'Restricted': True,
            'Description': {'GET': 'Returns an array of events from which the user have save',
                            'POST': 'Saves an event to the user\'s profile',
                            'DELETE': 'Deletes an event from the user\'s profile'}
        },
        {
            'Endpoint': '/api/profile/reviews/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Returns an array of reviews from which the user have left'}
        },
        {
            'Endpoint': '/api/profile/settings/picture/',
            'Method': ['GET', 'PUT', 'DELETE'],
            'Restricted': True,
            'Description': {'GET': 'Returns a location of the user\'s profile picture',
                            'PUT': 'Updates the user\'s profile picture',
                            'DELETE': 'Deletes the user\'s profile picture'}
        },
        {
            'Endpoint': '/api/profile/settings/info/',
            'Method': ['PUT'],
            'Restricted': True,
            'Description': {'PUT': 'Updates a user\'s information (username, password, &/or zip_code)'},
        },
        {
            'Endpoint': '/api/forgot/password/',
            'Method': ['PUT'],
            'Restricted': False,
            'Description': {'PUT': 'Update just a user\'s password in the event that they forget it'},
        },
        {
            'Endpoint': '/api/token/',
            'Method': ['POST'],
            'Restricted': None,
            'Description': {'POST': 'Used for logging in and generating tokens'}
        },
        {
            'Endpoint': '/api/token/refresh/',
            'Method': ['POST'],
            'Restricted': None,
            'Description': {'POST': 'Used for generating new access tokens with refresh token'}
        },
    ]
    
    return Response(routes)

@api_view(["POST"])
def signup(request):
    """
    Endpoint: /api/signup/
    """
    user_info = json.loads(request.body)
    validate = serializers.SignupValidateSerializer(data=user_info)
    if validate.is_valid():
        send_mail(
            "Event Tracking | Welcome, " + validate.validated_data["username"] + "! ",
            "Welcome!",
            None,
            [validate.validated_data["email"]],
            fail_silently=False,
            html_message = render_to_string("../email_templates/welcome.html", {"username": validate.validated_data["username"]})
        )
        user = User.objects.create_user(email=validate.validated_data["email"], username=validate.validated_data["username"], password=validate.validated_data["password"], zip_code=validate.validated_data["zip_code"])
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(validate.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def events(request, size, page, sort):
    """
    Endpoint: /api/events/page/<str:page>/size/<str:size>/sort/<str:sort>/
    """
    user = request.user
    events = ticketmaster_api.getEvents(user.zip_code, size, page, sort)
    if events != False:
        return Response(events, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsSearchInput(request, input, size, page, sort):
    """
    Endpoint: /api/events/search/input/<str:input>/page/<str:page>/size/<str:size>/sort/<str:sort>/
    """
    events = ticketmaster_api.getEvents(input, size, page, sort)
    if events != False:
        return Response(events, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsDetails(request, id):
    """
    Endpoint: /api/events/details/id/<str:id>/
    """
    events = ticketmaster_api.getEventsDetails(id)
    return Response(events, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsWeather(request, latitude, longitude):
    """
    Endpoint: /api/events/weather/latitude/<str:latitude>/longitude/<str:longitude>/
    """
    events = openweathermap_api.getEventsWeather(latitude, longitude)
    return Response(events, status=status.HTTP_200_OK)

@api_view(["POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def userReviews(request):
    """
    Endpoint: /api/user/reviews/
    """
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        data = json.loads(request.body)
        review = UserReviews(event_id=data["event_id"], title=data["title"], userRating=data["userRating"], userComment=data["userComment"], user=user)
        review.save()
        return Response(status=status.HTTP_201_CREATED)
    
    if request.method == "PUT":
        data = json.loads(request.body)
        review = UserReviews.objects.get(id=data["id"])
        review.userComment = data["userComment"]
        review.userRating = data["userRating"]
        review.isEdited = True
        review.save()
        serializer = serializers.EditedReviewSerializer(review, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        data = json.loads(request.body)
        review = UserReviews.objects.all().filter(id=data["review_id"])
        review.delete()
        return Response(status=status.HTTP_200_OK)
    
@api_view(["POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def userReplies(request):
    """
    Endpoint: /api/user/replies/
    """
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        data = json.loads(request.body)
        review = UserReviews(id=data["review_id"])
        reply = UserReplies(reply=data["reply"], review=review, user=user)
        reply.save()
        serializer = serializers.UserRepliesSerializer(reply)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    if request.method == "PUT":
        data = json.loads(request.body)
        reply = UserReplies.objects.get(id=data["reply_id"])
        reply.reply = data["editedReply"]
        reply.isEdited = True
        reply.save()
        serializer = serializers.EditedReplySerializer(reply, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == "DELETE":
        data = json.loads(request.body)
        reply = UserReplies.objects.get(id=data["reply_id"])
        reply.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllReviews(request, event_id):
    """
    Endpoint: /api/reviews/get/event_id/<str:event_id>/
    """
    reviews = UserReviews.objects.all().filter(event_id=event_id).order_by("id")
    serializer = serializers.UserReviewsSerializer(reviews, many=True)
    if serializer.data != []:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

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
        validate = serializers.CheckFileValidateSerializer(data=file)
        if validate.is_valid():
            ext = validate.validated_data["file"].name.split(".")[-1]
            validate.validated_data["file"].name = str(request.user) + "_profile_picture_id_" + str(uuid.uuid4())[:8] + "." + ext
            user = User.objects.get(username=request.user)
            user.profile_picture.delete()
            user.profile_picture = validate.validated_data["file"]
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            # status code 415 (UNSUPPORTED_MEDIA_TYPE) and or 413 (REQUEST_ENTITY_TOO_LARGE) would work
            # my problem is that it is one of the two OR both. i'll choose 400 for now.
            return Response(validate.errors, status=status.HTTP_400_BAD_REQUEST)

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
    print(data)
    validate = serializers.UpdateUserInfoValidateSerializer(data=data)
    old_email = ""
    if validate.is_valid():
        if(validate.validated_data["email"] != ""):
            old_email = user.email
            new_email = validate.validated_data["email"]
            user.email = new_email
            user.save()
        if(validate.validated_data["username"] != ""):
            user.username = validate.validated_data["username"]
            user.save()
        if(validate.validated_data["password"] != "" and validate.validated_data["confirm_password"] != ""):
            user.set_password(validate.validated_data["confirm_password"])
            user.save()
        if(validate.validated_data["zip_code"] != ""):
            user.zip_code = validate.validated_data["zip_code"]
            user.save()
        new_token = get_new_token(user, validate.validated_data["username"], validate.validated_data["zip_code"])
        if old_email == "":
            print("working")
            send_mail(
                "Account Information Change",
                "Your account information has changed. If this was indeed yourself, you can ignore this.",
                None,
                [user.email],
                fail_silently=False,
                html_message = render_to_string("../email_templates/account_info_change.html", {"username": user.username, "failed": False})
            )
        else:
            print("working")
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
        return Response(validate.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def resetPassword(request):
    """
    Endpoint: /api/reset/password/
    """
    # i am well aware of the flaw that the previous refresh token is still active (until it expires)
    # that refresh token may still be used to generate a new access token
    data = json.loads(request.body)
    validate = serializers.ResetPasswordValidateSerializer(data=data)
    if validate.is_valid():
        # obviously you shouldn't be able to update a password just because you know a username
        # there should be some secondary method of verifiction (such as email i'll find a way to do this later)
        # or use email as the verification since that's generally not public or harder to guess/find out
        user = User.objects.get(username=data["username"])
        user.set_password(validate.validated_data["confirm_password"])
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
            return Response(validate.errors, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(validate.errors, status=status.HTTP_404_NOT_FOUND)

def get_new_token(user, username, zip_code):
    # i am well aware of the flaw that the previous refresh token is still active (until it expires)
    # that refresh token may still be used to generate a new access token
    refresh = RefreshToken.for_user(user)

    refresh["id"] = user.id
    refresh["username"] = user.username
    refresh["zip_code"] = user.zip_code

    if username != "":
        refresh["username"] = username
    if zip_code != "":
        refresh['zip_code'] = zip_code

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }