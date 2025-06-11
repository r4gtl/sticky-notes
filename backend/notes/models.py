from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class StickyNote(models.Model):
    sender = models.ForeignKey(User, related_name='sent_notes', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_notes', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (da {self.sender} a {self.receiver})"
    

# Create your models here.
