from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from linky.core.serializers import UserSerializer

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

class EmailListViewSet(viewsets.ModelViewSet):
    serializer_class = EmailListSerializer
    queryset = EmailList.objects.all()

    # Filter by LinkTree
    def get_queryset(self):
        linktree_id = self.request.query_params.get('linktree')
        if linktree_id:
            return self.queryset.filter(linktree_id=linktree_id)
        return self.queryset
