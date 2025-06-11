from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView,
    StickyNoteListCreate,
    StickyNoteDetail,
)


urlpatterns = [
    # Autenticazione JWT
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Elenco e creazione delle sticky notes
    path('notes/', StickyNoteListCreate.as_view(), name='note-list-create'),
    # Dettaglio, aggiornamento parziale e cancellazione di una nota per il destinatario
    path('notes/<int:pk>/', StickyNoteDetail.as_view(), name='note-detail'),
]