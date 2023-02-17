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
    validate = serializers.SignupValidateSerializer(data=user_info)
    if validate.is_valid():
        send_mail(
            "Event Tracking | Welcome, " + validate.validated_data["username"] + "! ",
            "Welcome!",
            None,
            [validate.validated_data["email"]],
            fail_silently=False,
            html_message = render_to_string("../email_templates/welcome.html", {"username": validate.validated_data["username"]})
        )
        user = User.objects.create_user(email=validate.validated_data["email"], username=validate.validated_data["username"], password=validate.validated_data["password"], zip_code=validate.validated_data["zip_code"])
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(validate.errors, status=status.HTTP_400_BAD_REQUEST)