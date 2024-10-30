from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from core.serializers import UserSerializer
from .models import User


# Create your views here.

class RegisterView(APIView):
    """
    API view for user registration.
    """
    
    def post(self, request):
        """
        Handle POST request for user registration.

        Args:
            request: The HTTP request object containing user data.

        Returns:
            Response: A JSON response indicating success or failure of user creation.
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """
    API view for user logout.
    """

    def post(self, request):
        """
        Handle POST request for user logout.

        Args:
            request: The HTTP request object.

        Returns:
            Response: A JSON response indicating successful logout.
        """
    
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class UserListView(ListAPIView):
    serializer_class = UserSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['username', 'email']
    ordering_fields = ['username', 'date_joined']

    def get_queryset(self):
        queryset = User.objects.all()
        
        # Retrieve query parameters
        username = self.request.query_params.get('username')
        email = self.request.query_params.get('email')
        is_staff = self.request.query_params.get('is_staff')
        
        # Apply filters if the parameters are provided
        if username:
            queryset = queryset.filter(username=username)
        if email:
            queryset = queryset.filter(email=email)
        if is_staff is not None:  # Convert string to boolean
            queryset = queryset.filter(is_staff=(is_staff.lower() == 'true'))
        
        return queryset

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # The user is available through the request.user attribute
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
