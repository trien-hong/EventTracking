import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . models import UserEvents
from . serializers import UserEventsSerializer
import ticketmaster_api
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

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
            'Endpoint': '/api/events/',
            'method': 'GET',
            'description': 'Returns an array of events based on a default input. For example, a user zip code.'
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
            'Endpoint': '/api/profile/',
            'method': 'GET',
            'description': 'Returns an array of events from which the user have added/saved'
        },
        {
            'Endpoint': '/api/profile/save/id/<str:id>/',
            'method': 'POST',
            'description': 'Saves an event with data sent in post request'
        },
        {
            'Endpoint': '/api/profile/delete/id/<str:id>/',
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

@api_view(["GET"])
def events(request):
    """
    /api/events/
    """
    events = ticketmaster_api.getEvents("90028")
    return Response(events)

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
def profile(request):
    """
    /api/profile/
    """
    data = UserEvents.objects.all()
    serializer = UserEventsSerializer(data, many=True)
    if serializer.data == []:
        return Response(False)
    else:
        return Response(serializer.data)

@api_view(["DELETE"])
def profileDeleteEventId(request, id):
    """
    /api/profile/delete/event/id/<str:id>/
    """
    data = json.loads(request.body)
    if UserEvents.objects.all().filter(event_id=data["event_id"]).exists():
        event = UserEvents.objects.get(event_id=data["event_id"])
        event.delete()
        return Response(True)
    else:
        return Response(False)

@api_view(["POST"])
def profileSaveEventId(request, id):
    """
    /api/profile/save/event/id/<str:id>/
    """
    data = json.loads(request.body)
    if UserEvents.objects.all().filter(event_id=data["event_id"]).exists() == False:
        event = UserEvents(event_id=data["event_id"], title=data["title"], date=data["date"], city=data["city"], imageUrl=data["imageUrl"], minPrice=data["minPrice"], maxPrice=data["maxPrice"])
        event.save()
        return Response(True)
    else:
        return Response(False)