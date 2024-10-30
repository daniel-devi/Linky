import csv
from .models import *
from .serializers import *
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.

class LinkTreeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations on LinkTree objects.
    """
    permission_classes = []
    serializer_class = LinkTreeSerializer
    queryset = LinkTree.objects.all()

    @action(detail=True, methods=['get'])
    def links(self, request, pk=None):
        """
        Custom action to retrieve all links associated with a specific LinkTree.

        Args:
            request (HttpRequest): The HTTP request object.
            pk (int, optional): The primary key of the LinkTree object. Defaults to None.

        Returns:
            Response: A Response object containing serialized data of all associated links.
        """
        linktree = self.get_object()
        links = linktree.link_set.all()
        serializer = LinkSerializer(links, many=True)
        return Response(serializer.data)
    



class LinkView(ListAPIView):
    serializer_class = LinkSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['linktree',]
    ordering_fields = ['id',]

    def get_queryset(self):
        queryset = Link.objects.all()
        
        # Retrieve query parameters
        linktree = self.request.query_params.get('linktree')
        
        # Apply filters if the parameters are provided
    
        queryset = queryset.filter(linktree=linktree)
        
        
        return queryset



class LinkViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations on Link objects.
    """
    serializer_class = LinkSerializer
    queryset = Link.objects.all()


class EmailListViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations on EmailList objects.
    Includes functionality to filter queryset by LinkTree.
    """
    serializer_class = EmailListSerializer
    queryset = EmailList.objects.all()

    def get_queryset(self):
        """
        Override get_queryset to filter EmailList objects by LinkTree.

        Returns:
            QuerySet: Filtered queryset of EmailList objects.
        """
        queryset = super().get_queryset()
        linktree_id = self.request.query_params.get('linktree')
        if linktree_id:
            queryset = queryset.filter(linktree_id=linktree_id)
        return queryset


class ExportEmailListView(APIView):
    def get(self, request, linktree_id):
        """
        Export email list for a specific LinkTree as a CSV file.

        Args:
            request (HttpRequest): The HTTP request object.
            linktree_id (int): The ID of the LinkTree to export emails from.

        Returns:
            HttpResponse: A response containing the CSV file with emails.
        """
        # Retrieve the LinkTree object
        linktree = LinkTree.objects.get(id=linktree_id)
        
        # Get all emails associated with the LinkTree
        emails = EmailList.objects.filter(linktree=linktree)

        # Create an HTTP response with CSV content type
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{linktree.title}_emails.csv"'

        # Create a CSV writer and write the email data
        writer = csv.writer(response)
        writer.writerow(['Email'])
        for email in emails:
            writer.writerow([email.email])

        return response
