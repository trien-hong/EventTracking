from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import ticketmaster_api
# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    """
    api/ or ""
    """
    routes = [
        {
            'Endpoint': 'api/events/',
            'method': 'GET',
            'description': 'Returns an array of events based on a default input. For example, a user zip code.'
        },
        {
            'Endpoint': 'api/events/id/',
            'method': 'GET',
            'description': 'Returns a single event object'
        },
        {
            'Endpoint': 'api/events/input/',
            'method': 'GET',
            'description': 'Returns an array of events based on the user input'
        },
        {
            'Endpoint': 'api/profile/',
            'method': 'GET',
            'description': 'Returns an array of events from which users have added/saved'
        },
        {
            'Endpoint': 'api/profile/save/',
            'method': 'POST',
            'description': 'Saves an event with data sent in post request'
        },
        {
            'Endpoint': 'api/profile/delete/',
            'method': 'DELETE',
            'description': 'Deletes an event from profile'
        },
    ]
    
    return Response(routes)

@api_view(["GET"])
def events(request):
    """
    api/events/
    """
    events = ticketmaster_api.getEvents("90028")
    return Response(events)

@api_view(["GET"])
def eventsId(request, id):
    """
    /api/events/id/
    """
    events = ticketmaster_api.getEventDetails(id)
    return Response(events)

@api_view(["GET"])
def eventsInput(request, input):
    """
    /api/events/input
    """
    events = ticketmaster_api.getEvents(input)
    return Response(events)