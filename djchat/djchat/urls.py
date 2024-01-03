from account.views import AccountViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from server.views import CategoryListViewSet, ServerListViewSet
from webchat.consumer import WebChatConsumer
from webchat.views import MessageViewSet

router = DefaultRouter()
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="message")
router.register("api/account", AccountViewSet, basename="message")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + router.urls

websocket_urlpatterns = [path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
