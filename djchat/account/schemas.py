from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import AccountSerializer

user_list_docs = extend_schema(
    responses=AccountSerializer(),
    parameters=[
        OpenApiParameter(
            name="user_id",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="User ID",
        ),
    ],
)
