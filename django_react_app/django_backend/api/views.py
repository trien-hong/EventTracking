import json
import uuid
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . models import UserEvents
from . models import UserReviews
from . serializers import UserEventsSerializer
from . serializers import GetReviewsSerializer
from . serializers import GetProfilePictureSerializer
from . import serializers
import ticketmaster_api
import openweathermap_api
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
    Endpoint: /api/ or ""
    """
    routes = [
        {
            'Endpoint': '/api/signup/',
            'Method': ['POST'],
            'Restricted': False,
            'Description': {'POST': 'Signup a user and save their information inside the database'}
        },
        {
            'Endpoint': '/api/events/page/<str:page>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Returns an array of events based on the current logged in user zip code'}
        },
        {
            'Endpoint': '/api/events/search/input/<str:input>/page/<str:page>/',
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
            'Description': {'POST': 'Saves reviews left by the users to the database',
                            'PUT': 'Updates the specific review left by a user',
                            'DELETE': 'Deletes the specific review left by the user'}
        },
        {
            'Endpoint': '/api/reviews/get/event_id/<str:event_id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {'GET': 'Get the reviews left by all users for that specific event'}
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
            'Endpoint': '/api/profile/picture/',
            'Method': ['GET', 'PUT'],
            'Restricted': True,
            'Description': {'GET': 'Returns a location of the user\'s profile picture',
                            'PUT': 'Updates the user\'s profile picture'}
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
    validate = serializers.SignUpValidateSerializer(data=user_info)
    if validate.is_valid():
        user = User.objects.create_user(username=validate.validated_data["username"], password=validate.validated_data["password"], zip_code=validate.validated_data["zip_code"])
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(validate.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def events(request, page):
    """
    Endpoint: /api/events/page/<str:page>/
    """
    user = request.user
    events = ticketmaster_api.getEvents(user.zip_code, page)
    if events != False:
        return Response(events, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsSearchInput(request, input, page):
    """
    Endpoint: /api/events/search/input/<str:input>/page/<str:page>/
    """
    events = ticketmaster_api.getEvents(input, page)
    if events != False:
        return Response(events, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

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
        review.save()
        return Response(status=status.HTTP_200_OK)

    if request.method == "DELETE":
        data = json.loads(request.body)
        review = UserReviews.objects.all().filter(id=data["review_id"])
        review.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllReviews(request, event_id):
    """
    Endpoint: /api/reviews/get/event_id/<str:event_id>/
    """
    reviews = UserReviews.objects.all().filter(event_id=event_id).order_by("id")
    serializer = GetReviewsSerializer(reviews, many=True)
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
        serializer = UserEventsSerializer(data, many=True)
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
    serializer = GetReviewsSerializer(reviews, many=True)
    if serializer.data != []:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profilePicture(request):
    """
    Endpoint: /api/profile/picture/
    """
    if request.method == "GET":
        user = User.objects.get(username=request.user)
        serializer = GetProfilePictureSerializer(user, many=False)
        if serializer.data["profile_picture"] != None:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == "PUT":
        file = request.FILES
        validate = serializers.CheckFileValidateSerializer(data=file)
        if validate.is_valid():
            validate.validated_data["file"].name = str(request.user) + "_id_" + str(uuid.uuid4())[:8] + "." + validate.validated_data["file"].name.split(".")[-1]
            user = User.objects.get(username=request.user)
            user.profile_picture.delete()
            user.profile_picture = validate.validated_data["file"]
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            # status code 415 (UNSUPPORTED_MEDIA_TYPE) and or 413 (REQUEST_ENTITY_TOO_LARGE) would work
            # my problem is that it is one of the two OR both. i'll choose 400 for now. i'll find a better solution later.
            return Response(validate.errors, status=status.HTTP_400_BAD_REQUEST)