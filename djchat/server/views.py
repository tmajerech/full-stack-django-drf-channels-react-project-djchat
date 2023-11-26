from django.db.models import Count
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.response import Response

from server.models import Server
from server.serializers import ServerSerializer

from .schema import server_list_docs


@server_list_docs
class ServerListViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = self.get_queryset(request)
        serializer = self.get_serializer(queryset, request)
        return Response(serializer.data)

    def get_serializer(self, queryset, request):
        with_num_members = request.query_params.get("with_num_members") == "true"
        return ServerSerializer(queryset, many=True, context={"num_members": with_num_members})

    def get_queryset(self, request):
        queryset = Server.objects.all()
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if (by_user or by_serverid) and not request.user.is_authenticated:
            raise AuthenticationFailed()

        if category:
            queryset = queryset.filter(category__name=category)

        if by_user:
            user_id = request.user.id
            queryset = queryset.filter(member=user_id)

        if by_serverid:
            try:
                queryset = queryset.filter(id=by_serverid)
                if not queryset.exists():
                    raise ValidationError(detail=f"Server with id {by_serverid} not found")
            except ValueError:
                raise ValidationError(detail=f"Server value error")

        if with_num_members:
            queryset = queryset.annotate(num_members=Count("member"))

        if qty:
            queryset = queryset[:int(qty)]

        return queryset
