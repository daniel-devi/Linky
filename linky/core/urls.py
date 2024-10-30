from django.urls import path
from .views import *

# Define URL patterns for the application
urlpatterns = [
    # LinkTree endpoints
    path('linktrees/', LinkTreeViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='linktree-list'),

    path('linktrees/<str:uuid>/', LinkTreeViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='linktree-detail'),
    
    # Link endpoints
    path('links/', LinkViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='link-list'),

path("get_links/", LinkView.as_view(), name="get_link_by_uuid"),

    path('links/<int:pk>/', LinkViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='link-detail'),
    
    # EmailList endpoints
    path('emaillists/', EmailListViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='emaillist-list'),

    # EmailList Objects endpoints
    path('emaillists/<int:pk>/', EmailListViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='emaillist-detail'),
]
