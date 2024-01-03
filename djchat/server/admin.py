from django.contrib import admin

from .models import Category, Channel, Server

admin.site.register(Channel)
admin.site.register(Server)
admin.site.register(Category)
