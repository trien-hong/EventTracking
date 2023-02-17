import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import UserReviews
from ..models import UserReplies
from .. import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

@api_view(["POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def userReviews(request):
    """
    Endpoint: /api/user/reviews/
    """
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        data = json.loads(request.body)
        review = UserReviews(event_id=data["event_id"], title=data["title"], userRating=data["userRating"], userComment=data["userComment"], user=user)
        review.save()
        return Response(status=status.HTTP_201_CREATED)
    
    if request.method == "PUT":
        data = json.loads(request.body)
        review = UserReviews.objects.get(id=data["id"])
        review.userComment = data["userComment"]
        review.userRating = data["userRating"]
        review.isEdited = True
        review.save()
        serializer = serializers.EditedReviewSerializer(review, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "DELETE":
        data = json.loads(request.body)
        review = UserReviews.objects.all().filter(id=data["review_id"])
        review.delete()
        return Response(status=status.HTTP_200_OK)
    
@api_view(["POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def userReplies(request):
    """
    Endpoint: /api/user/replies/
    """
    if request.method == "POST":
        user = User.objects.get(id=request.user.id)
        data = json.loads(request.body)
        review = UserReviews(id=data["review_id"])
        reply = UserReplies(reply=data["reply"], review=review, user=user)
        reply.save()
        serializer = serializers.UserRepliesSerializer(reply)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    if request.method == "PUT":
        data = json.loads(request.body)
        reply = UserReplies.objects.get(id=data["reply_id"])
        reply.reply = data["editedReply"]
        reply.isEdited = True
        reply.save()
        serializer = serializers.EditedReplySerializer(reply, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == "DELETE":
        data = json.loads(request.body)
        reply = UserReplies.objects.get(id=data["reply_id"])
        reply.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllReviews(request, event_id):
    """
    Endpoint: /api/reviews/get/event_id/<str:event_id>/
    """
    reviews = UserReviews.objects.all().filter(event_id=event_id).order_by("id")
    serializer = serializers.UserReviewsSerializer(reviews, many=True)
    if serializer.data != []:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)