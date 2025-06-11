from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import StickyNote
from .serializers import StickyNoteSerializer


class StickyNoteViewSet(viewsets.ModelViewSet):
    queryset = StickyNote.objects.all()
    serializer_class = StickyNoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StickyNote.objects.filter(recipient=self.request.user)
    


