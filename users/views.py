from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import ModelViewSet

from .serializers import *


class UserContactAPI(ModelViewSet):
    queryset = UserContact.objects.all()
    serializer_class = UserContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class UserKycAPI(ModelViewSet):
    queryset = UserKyc.objects.all()
    serializer_class = UserKycSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class UserAddressAPI(ModelViewSet):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class UserDetailAPI(ModelViewSet):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class UserAPI(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = '__all__'


class FullUserAPI(ModelViewSet):
    queryset = CustomUser.objects.order_by("-created")
    serializer_class = FullUserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class UserNameListAPI(ListAPIView):
    def list(self, request, *args, **kwargs):
        is_active = False if request.query_params.get('all', None) else True
        queryset = CustomUser.objects.filter(is_active=is_active).values_list('name', flat=True).order_by('name')
        return Response(queryset, HTTP_200_OK)


class GetAddressStates(ListAPIView):
    serializer_class = UserAddressSerializer
    queryset = UserAddress.objects.all()

    def get(self, request):
        # return Response({'data': sorted([i.label for i in Expense.PaymentMode]),
        #                  'status': HTTP_200_OK})
        return Response(sorted([i.label for i in UserAddress.IndianStates]))
