from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Note(models.Model):
    sender = models.ForeignKey(User, related_name='sent_notes', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_notes', on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender} -> {self.recipient} | {self.message[:30]}"
    

# Create your models here.
