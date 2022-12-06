import json
from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . models import Profile
from . serializers import ProfileSerializer
import ticketmaster_api
# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    """
    /api/ or "" or
    """
    routes = [
        {
            'Endpoint': 'api/events/',
            'method': 'GET',
            'description': 'Returns an array of events based on a default input. For example, a user zip code.'
        },
        {
            'Endpoint': 'api/events/id/<str:id>',
            'method': 'GET',
            'description': 'Returns a single event object'
        },
        {
            'Endpoint': 'api/profile/',
            'method': 'GET',
            'description': 'Returns an array of events from which the user have added/saved'
        },
        {
            'Endpoint': 'api/profile/save/id/<str:id>',
            'method': 'POST',
            'description': 'Saves an event with data sent in post request'
        },
        {
            'Endpoint': 'api/profile/delete/id<str:id',
            'method': 'DELETE',
            'description': 'Deletes an event from profile'
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
def eventsInput(request, input):
    """
    /api/events/input/<str:input>/
    """
    events = ticketmaster_api.getEvents(input)
    return Response(events)

@api_view(["GET"])
def profile(request):
    """
    /api/profile/
    """
    data = Profile.objects.all()
    serializer = ProfileSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def profileSaveEventId(request, id):
    """
    /api/profile/save/event/id/<str:id>/
    """
    data = json.loads(request.body)
    if Profile.objects.all().filter(event_id=data["event_id"]).exists() == False:
        event = Profile(event_id=data["event_id"], title=data["title"], date=data["date"], imageUrl=data["imageUrl"], minPrice=data["minPrice"], maxPrice=data["maxPrice"])
        event.save()
        print("True")
        return Response(True)
    else:
        print("False")
        return Response(False)