from rest_framework.serializers import ModelSerializer, CharField

from .models import *


class UserContactSerializer(ModelSerializer):
    class Meta:
        model = UserContact
        fields = '__all__'


class UserKycSerializer(ModelSerializer):
    class Meta:
        model = UserKyc
        fields = '__all__'


class UserAddressSerializer(ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'


class UserDetailSerializer(ModelSerializer):
    contact = UserContactSerializer(read_only=True)
    kyc = UserKycSerializer(read_only=True)
    address = UserAddressSerializer(read_only=True)

    class Meta:
        model = UserDetail
        fields = '__all__'


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = CustomUser
        exclude = ["additional_info", "groups", "user_permissions", ]

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class FullUserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    additional_info = UserDetailSerializer(read_only=True)

    class Meta:
        model = CustomUser
        exclude = ["groups", "user_permissions", ]
