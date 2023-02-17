from third_party_apis import ticketmaster_api
from third_party_apis import openweathermap_api
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
User = get_user_model()

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
        return Response({user.zip_code}, status=status.HTTP_404_NOT_FOUND)

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