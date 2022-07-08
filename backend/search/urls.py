from django.urls import path
from .views import ChatFrontendAPIView, ChatBackendAPIView

urlpatterns = [
    path('chats/frontend', ChatFrontendAPIView.as_view()),
    path('chats/backend', ChatBackendAPIView.as_view()),
]