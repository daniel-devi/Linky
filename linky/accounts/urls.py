from django.urls import path
from .views import *

# Define URL patterns for the accounts app
urlpatterns = [
    # URL pattern for user registration
    path('register/', RegisterView.as_view(), name='register'),
    
    # URL pattern for user logout
    path('logout/', LogoutView.as_view(), name='logout'),

    # URL getUsername Model
    path('user', UserListView.as_view(), name='user'),

    # URL pattern for user detail view
    path('detail', UserDetailView.as_view(), name='user-detail'),


]
