from .models import UserEvents
from .models import UserReplies
from .models import UserReviews
from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()
# Register your models here.

admin.site.register(UserEvents)
admin.site.register(UserReplies)
admin.site.register(UserReviews)
admin.site.register(User)