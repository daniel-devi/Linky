from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    """
    Custom User model that extends Django's AbstractUser.
    
    This model adds a unique email field to the default user model.
    """
    email = models.EmailField(unique=True)
    # The 'unique=True' argument ensures that no two users can have the same email address
