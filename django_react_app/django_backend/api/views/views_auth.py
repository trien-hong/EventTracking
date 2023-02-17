from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def get_new_token(user, username):
    # i am well aware of the flaw that the previous refresh token is still active (until it expires)
    # that refresh token may still be used to generate a new access token
    refresh = RefreshToken.for_user(user)

    refresh["id"] = user.id
    refresh["username"] = user.username

    if username != "":
        refresh["username"] = username

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }