from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Account
from .schemas import user_list_docs
from .serializers import AccountSerializer


class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]

    @user_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response(serializer.data)
