import json
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . models import UserEvents
from . models import UserReviews
from . serializers import UserEventsSerializer
from . serializers import GetReviewsSerializer
from . import forms
import ticketmaster_api
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['zip_code'] = user.zip_code

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
    """
    /api/ or ""
    """
    routes = [
        {
            'Endpoint': '/api/signup_user/',
            'Method': ['POST'],
            'Restricted': False,
            'Description': 'Signup a user'
        },
        {
            'Endpoint': '/api/events/page/<str:page>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': 'Returns an array of events based on the current logged in user zip code.'
        },
        {
            'Endpoint': '/api/events/search/input/<str:input>/page/<str:page>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': 'Returns an array of events based on input for searching events.'
        },
        {
            'Endpoint': '/api/events/details/id/<str:id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': 'Returns a single event with even more details about it.'
        },
        {
            'Endpoint': '/api/user/review/add/',
            'Method': ['POST'],
            'Restricted': True,
            'Description': 'Add review left by the user'
        },
        {
            'Endpoint': '/api/reviews/get/event_id/<str:event_id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': 'Get the reviews left by all users for that specific event'
        },
        {
            'Endpoint': '/api/profile/username/<str:username>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': 'Returns an array of events from which the user have added/saved'
        },
        {
            'Endpoint': '/api/profile/save/event/id/',
            'Method': ['POST'],
            'Restricted': True,
            'Description': 'Saves an event with data sent in post request'
        },
        {
            'Endpoint': '/api/profile/delete/event/id/',
            'Method': ['DELETE'],
            'Restricted': True,
            'Description': 'Deletes an event from profile'
        },
        {
            'Endpoint': '/api/token/',
            'Method': ['POST'],
            'Restricted': None,
            'Description': 'Used for logging in and generating tokens.'
        },
        {
            'Endpoint': '/api/token/refresh/',
            'Method': ['POST'],
            'Restricted': None,
            'Description': 'Used for generating new access tokens with refresh token.'
        },
    ]
    
    return Response(routes)

@api_view(["POST"])
def signup_user(request):
    """
    /api/signup_user/
    """
    user_info = json.loads(request.body)
    form = forms.Signup(user_info)
    if form.is_valid():
        User = get_user_model()
        user = User.objects.create_user(username=user_info["username"], password=user_info["password"], zip_code=user_info["zip_code"])
        return Response(True)
    else:
        return Response(form.errors.values())

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def events(request, page):
    """
    /api/events/page/<str:page>/
    """
    user = request.user
    events = ticketmaster_api.getEvents(user.zip_code, page)
    return Response(events)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsSearchInput(request, input, page):
    """
    /api/events/search/input/<str:input>/page/<str:page>/
    """
    events = ticketmaster_api.getEvents(input, page)
    return Response(events)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsId(request, id):
    """
    /api/events/details/id/<str:id>/
    """
    events = ticketmaster_api.getEventDetails(id)
    return Response(events)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addUserReview(request):
    """
    /api/user/review/add/
    """
    user = request.user
    data = json.loads(request.body)
    review = UserReviews(event_id=data["event_id"], title=data["title"], userName=user, userRating=data["userRating"], userComment=data["userComment"])
    review.save()
    return Response(True)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllReviews(request, event_id):
    """
    /api/reviews/get/event_id/<str:event_id>/
    """
    reviews = UserReviews.objects.all().filter(event_id=event_id)
    serializer = GetReviewsSerializer(reviews, many=True)
    if serializer.data == []:
        return Response(False)
    else:
        return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request, username):
    """
    /api/profile/username/<str:username>/
    """
    data = UserEvents.objects.all().filter(username=username)
    serializer = UserEventsSerializer(data, many=True)
    if serializer.data == []:
        return Response(False)
    else:
        return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def profileSaveEventId(request):
    """
    /api/profile/save/event/id/
    """
    user = request.user
    data = json.loads(request.body)
    if UserEvents.objects.all().filter(username=user.username, event_id=data["event_id"]).exists() == False:
        event = UserEvents(event_id=data["event_id"], title=data["title"], date=data["date"], city=data["city"], imageUrl=data["imageUrl"], minPrice=data["minPrice"], maxPrice=data["maxPrice"], username=user.username)
        event.save()
        return Response(True)
    else:
        return Response(False)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def profileDeleteEventId(request):
    """
    /api/profile/delete/event/id/
    """
    user = request.user
    data = json.loads(request.body)
    if UserEvents.objects.all().filter(username=user.username, event_id=data["event_id"]).exists():
        event = UserEvents.objects.get(username=user.username, event_id=data["event_id"])
        event.delete()
        return Response(True)
    else:
        return Response(False)