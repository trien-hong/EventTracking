import json
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
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
            'method': 'POST',
            'description': 'Signup a user'
        },
        {
            'Endpoint': '/api/events/id/<str:id>/',
            'method': 'GET',
            'description': 'Returns a single event object'
        },
        {
            'Endpoint': '/api/events/input/<str:input>/',
            'method': 'GET',
            'description': 'Returns an array of events based on input. Used for searching events.'
        },
        {
            'Endpoint': '/api/profile/username/<str:username>/',
            'method': 'GET',
            'description': 'Returns an array of events from which the user have added/saved'
        },
        {
            'Endpoint': '/api/profile/username/<str:username>/save/event/id/<str:id>/',
            'method': 'POST',
            'description': 'Saves an event with data sent in post request'
        },
        {
            'Endpoint': '/api/profile/username/<str:username>/delete/event/id/<str:id>/',
            'method': 'DELETE',
            'description': 'Deletes an event from profile'
        },
        {
            'Endpoint': '/api/token/',
            'method': '',
            'description': ''
        },
        {
            'Endpoint': '/api/token/refresh/',
            'method': '',
            'description': ''
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
def eventsId(request, id):
    """
    /api/events/id/<str:id>/
    """
    events = ticketmaster_api.getEventDetails(id)
    return Response(events)

@api_view(["GET"])
def eventsSearchInput(request, input):
    """
    /api/events/search/input/<str:input>/
    """
    events = ticketmaster_api.getEvents(input)
    return Response(events)

@api_view(["GET"])
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

@api_view(["DELETE"])
def profileDeleteEventId(request, username, id):
    """
    /api/profile/username/<str:username>/delete/event/id/<str:id>/
    """
    data = json.loads(request.body)
    if UserEvents.objects.all().filter(username=username, event_id=data["event_id"]).exists():
        event = UserEvents.objects.get(username=username, event_id=data["event_id"])
        event.delete()
        return Response(True)
    else:
        return Response(False)

@api_view(["POST"])
def profileSaveEventId(request, username, id):
    """
    /api/profile/username/<str:username>/save/event/id/<str:id>/
    """
    data = json.loads(request.body)
    if UserEvents.objects.all().filter(username=username, event_id=data["event_id"]).exists() == False:
        event = UserEvents(event_id=data["event_id"], title=data["title"], date=data["date"], city=data["city"], imageUrl=data["imageUrl"], minPrice=data["minPrice"], maxPrice=data["maxPrice"], username=username)
        event.save()
        return Response(True)
    else:
        return Response(False)