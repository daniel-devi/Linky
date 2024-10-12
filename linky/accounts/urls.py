from django.urls import path
from .views import RegisterView, LogoutView

# Define URL patterns for the accounts app
urlpatterns = [
    # URL pattern for user registration
    path('register/', RegisterView.as_view(), name='register'),
    
    # URL pattern for user logout
    path('logout/', LogoutView.as_view(), name='logout'),
]
