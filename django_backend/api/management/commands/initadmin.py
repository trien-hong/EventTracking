# Credit to David Karchmer for this file
# I did make some modifications to better fit my own needs

import os
from dotenv import find_dotenv, load_dotenv
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
User = get_user_model()
Superusers = User.objects.filter(is_superuser=True)
load_dotenv(find_dotenv())

class Command(BaseCommand):
    def handle(self, *args, **options):
        if not Superusers:
            admin = User.objects.create_superuser(email=os.getenv("superuser_test_email"), username=os.getenv("superuser_test_username"), password=os.getenv("superuser_test_password"))
            admin.is_active = True
            admin.is_admin = True
            admin.save()
            print("Admin user created.")
        else:
            print("Admin user already exist. No need to create another.")