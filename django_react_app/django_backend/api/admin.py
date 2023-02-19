from .models import UserEvents
from .models import UserReplies
from .models import UserReviews
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
User = get_user_model()
# Register your models here.

class ConfigUserEventsAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title', 'date', 'city', 'event_id']

class ConfigUserReviewsAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'userComment', 'userRating', 'title', 'isEdited']

class ConfigUserRepliesAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'reply', 'isEdited']

class ConfigUserAdmin(UserAdmin):
    list_display = ['username', 'id', 'email', 'is_staff']


admin.site.register(UserEvents, ConfigUserEventsAdmin)
admin.site.register(UserReviews, ConfigUserReviewsAdmin)
admin.site.register(UserReplies, ConfigUserRepliesAdmin)
admin.site.register(User, ConfigUserAdmin)