from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from . views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("api/", views.getRoutes, name="routes"),
    path("api/signup/", views.signup, name="signup"),
    path("api/events/size/<str:size>/page/<str:page>/sort/<str:sort>/", views.events, name="events"),
    path("api/events/details/id/<str:id>/", views.eventsDetails, name="eventsDetails"),
    path("api/events/weather/latitude/<str:latitude>/longitude/<str:longitude>/", views.eventsWeather, name="eventsWeather"),
    path("api/events/search/input/<str:input>/size/<str:size>/page/<str:page>/sort/<str:sort>/", views.eventsSearchInput, name="eventsSearchInput"),
    path("api/user/reviews/", views.userReviews, name="userReviews"),
    path("api/user/replies/", views.userReplies, name="userReplies"),
    path("api/reviews/get/event_id/<str:event_id>/", views.getAllReviews, name="getAllReviews"),
    path("api/profile/events/", views.profileEvents, name="profileEvents"),
    path("api/profile/reviews/", views.profileReview, name="profileReview"),
    path("api/profile/settings/picture/", views.profileSettingsPicture, name="profileSettingsPicture"),
    path("api/profile/settings/info/", views.profileSettingsInfo, name="profileSettingsInfo"),
    path("api/profile/delete/account/", views.profileDeleteAccount, name="profileDeleteAccount"),
    path("api/reset/password/", views.resetPassword, name="resetPassword"),
    path("api/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)