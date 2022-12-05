from django.urls import path
from . import views

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("api/", views.getRoutes, name="routes"),
    path("api/events/", views.events, name="events"),
    path("api/events/id/<str:id>/", views.eventsId, name="eventId"),
    path("api/events/input/<str:input>/", views.eventsInput, name="eventsInput")
]