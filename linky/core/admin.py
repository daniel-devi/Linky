from django.contrib import admin
from .models import *

# Register your models here.
class LinkTreeAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'uuid')
    list_filter = ('user',)
    search_fields = ('user', 'title', 'uuid')

admin.site.register(LinkTree, LinkTreeAdmin)

class LinkAdmin(admin.ModelAdmin):
    list_display = ('linktree', 'url', 'title')
    list_filter = ('linktree',)
    search_fields = ('linktree', 'url', 'title')

admin.site.register(Link, LinkAdmin)

class EmailListAdmin(admin.ModelAdmin):
    list_display = ('linktree', 'email')
    list_filter = ('linktree',)
    search_fields = ('linktree', 'email')

admin.site.register(EmailList, EmailListAdmin)