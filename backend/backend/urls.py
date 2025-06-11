from django.contrib import admin
from django.urls import include, path
from notes.views import NoteViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
