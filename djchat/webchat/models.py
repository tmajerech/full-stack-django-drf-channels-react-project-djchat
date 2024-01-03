from django.contrib.auth import get_user_model
from django.db import models


class Conversation(models.Model):
    channel_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="message")
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
