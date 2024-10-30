from django.db import models
from accounts.models import User
import uuid

# Create your models here.

class LinkTree(models.Model):
    """
    Represents a user's LinkTree, which is a collection of links.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    uuid = models.UUIDField(default=uuid.uuid4, editable=True, unique=True)

    def __str__(self):
        return self.title

class Link(models.Model):
    """
    Represents a single link within a LinkTree.
    """
    linktree = models.ForeignKey(LinkTree, on_delete=models.CASCADE)
    url = models.URLField()
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class EmailList(models.Model):
    """
    Represents an email associated with a LinkTree, possibly for mailing list purposes.
    """
    linktree = models.ForeignKey(LinkTree, on_delete=models.CASCADE)
    email = models.EmailField()

    def __str__(self):
        return self.email