from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from notes.models import StickyNote
from notes.serializers import StickyNoteSerializer
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()


# View per l'elenco utenti
class UsersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


# View per la registrazione degli utenti
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    'user_id': user.id,
                    'username': user.username,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Views per le sticky notes (autenticate via JWT)
class StickyNoteListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notes = StickyNote.objects.all()
        # note ricevute non lette
        if request.query_params.get('unread') == 'true':
            notes = notes.filter(receiver=request.user, is_read=False)
        # note inviate
        elif request.query_params.get('sent') == 'true':
            notes = notes.filter(sender=request.user)
        else:
            notes = notes.filter(receiver=request.user)
        notes = notes.order_by('-created_at')
        serializer = StickyNoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Crea una nuova sticky note: il campo `sender` è impostato sull'utente autenticato.
        """
        data = request.data.copy()
        data['sender'] = request.user.id
        serializer = StickyNoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StickyNoteDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(StickyNote, pk=pk, receiver=user)

    def get(self, request, pk):
        note = self.get_object(pk, request.user)
        serializer = StickyNoteSerializer(note)
        return Response(serializer.data)

    def patch(self, request, pk):
        note = self.get_object(pk, request.user)
        serializer = StickyNoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        note = self.get_object(pk, request.user)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
