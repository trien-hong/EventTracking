import json
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . models import UserEvents
from . serializers import UserEventsSerializer
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
            'Restricted': False,
            'Method': ['POST'],
            'Description': 'Signup a user'
        },
        {
            'Endpoint': '/api/events/',
            'Restricted': True,
            'Method': ['GET'],
            'Description': 'Returns an array of events based on the current logged in user zip code.'
        },
        {
            'Endpoint': '/api/events/details/id/<str:id>/',
            'Restricted': True,
            'Method': ['GET'],
            'Description': 'Returns a single event with even more details about it.'
        },
        {
            'Endpoint': '/api/events/search/input/<str:input>/',
            'Restricted': True,
            'Method': ['GET'],
            'Description': 'Returns an array of events based on input for searching events.'
        },
        {
            'Endpoint': '/api/profile/username/<str:username>/',
            'Restricted': True,
            'Method': ['GET'],
            'Description': 'Returns an array of events from which the user have added/saved'
        },
        {
            'Endpoint': '/api/profile/save/event/id/',
            'Restricted': True,
            'Method': ['POST'],
            'Description': 'Saves an event with data sent in post request'
        },
        {
            'Endpoint': '/api/profile/delete/event/id/',
            'Restricted': True,
            'Method': ['DELETE'],
            'Description': 'Deletes an event from profile'
        },
        {
            'Endpoint': '/api/token/',
            'Restricted': None,
            'Method': ['POST'],
            'Description': 'Used for logging in and generating tokens.'
        },
        {
            'Endpoint': '/api/token/refresh/',
            'Restricted': None,
            'Method': ['POST'],
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
def eventsId(request, id):
    """
    /api/events/details/id/<str:id>/
    """
    events = ticketmaster_api.getEventDetails(id)
    return Response(events)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def eventsSearchInput(request, input, page):
    """
    /api/events/search/input/<str:input>/page/<str:page>
    """
    events = ticketmaster_api.getEvents(input, page)
    return Response(events)

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