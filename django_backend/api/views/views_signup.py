import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .. import serializers
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
User = get_user_model()

@api_view(["POST"])
def signup(request):
    """
    Endpoint: /api/signup/
    """
    user_info = json.loads(request.body)
    serializer = serializers.SignupValidateSerializer(data=user_info)
    if serializer.is_valid():
        send_mail(
            "Event Tracking | Welcome, " + serializer.validated_data["username"] + "! ",
            "Welcome!",
            None,
            [serializer.validated_data["email"]],
            fail_silently=False,
            html_message = render_to_string("../email_templates/welcome.html", {"username": serializer.validated_data["username"]})
        )
        user = User.objects.create_user(email=serializer.validated_data["email"], username=serializer.validated_data["username"], password=serializer.validated_data["password"], zip_code=serializer.validated_data["zip_code"])
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)