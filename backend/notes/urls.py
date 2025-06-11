from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import StickyNoteViewSet

router = DefaultRouter()
router.register(r'stickynotes', StickyNoteViewSet, basename='stickynote')

urlpatterns = router.urls