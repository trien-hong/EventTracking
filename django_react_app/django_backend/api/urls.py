from django.urls import path
from . import views
from . views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("api/", views.getRoutes, name="routes"),
    path("api/signup_user/", views.signup_user, name="signup_user"),
    path("api/events/id/<str:id>/", views.eventsId, name="eventId"),
    path("api/events/search/input/<str:input>/", views.eventsSearchInput, name="eventsSearchInput"),
    path("api/profile/username/<str:username>/", views.profile, name="profile"),
    path("api/profile/username/<str:username>/delete/event/id/<str:id>/", views.profileDeleteEventId, name="profileDeleteEventId"),
    path("api/profile/username/<str:username>/save/event/id/<str:id>/", views.profileSaveEventId, name="profileSaveEventId"),
    path("api/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]