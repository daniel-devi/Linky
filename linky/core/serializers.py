from rest_framework import serializers
from .models import User, LinkTree, Link, EmailList

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Converts User model instances to JSON and vice versa.
    """
    class Meta:
        model = User
        fields = '__all__'

class LinkTreeSerializer(serializers.ModelSerializer):
    """
    Serializer for the LinkTree model.
    Handles serialization and deserialization of LinkTree objects.
    """
    class Meta:
        model = LinkTree
        fields = '__all__'

class LinkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Link model.
    Manages the conversion between Link model instances and Python datatypes.
    """
    class Meta:
        model = Link
        fields = '__all__'

class EmailListSerializer(serializers.ModelSerializer):
    """
    Serializer for the EmailList model.
    Facilitates the transformation of EmailList objects to and from JSON.
    """
    class Meta:
        model = EmailList
        fields = '__all__'

