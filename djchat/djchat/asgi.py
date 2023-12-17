"""
ASGI config for djchat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import URLRouter, ProtocolTypeRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djchat.settings')

django_application = get_asgi_application()

from .import urls # noqa isort:skip

application = ProtocolTypeRouter(
    {
        "http": django_application,
        "websocket": URLRouter(urls.websocket_urlpatterns),

    }
)
