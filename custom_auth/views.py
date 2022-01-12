from django.conf import settings
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

from users.models import CustomUser
from users.serializers import UserSerializer


class ObtainExpiringAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            token, created = Token.objects.get_or_create(user=serializer.validated_data['user'])

            if not created:
                # update the created time of the token to keep it valid
                token.created = timezone.now()
                token.save()
            token_expires = timezone.now() + timezone.timedelta(seconds=settings.TOKEN_EXPIRY_TIME)

            user = serializer.validated_data['user']
            user_serializer = UserSerializer(instance=CustomUser.objects.get(pk=user.pk))
            # print(user_serializer.data)
            return Response(
                {'token': token.key, 'created': token.created, 'expires': token_expires, 'user': user_serializer.data})
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user_email = request.data.get('username', None)
        if user_email is not None:
            user = CustomUser.objects.get(email=user_email)
            token, created = Token.objects.get_or_create(user=user)
            token.delete()
            return Response("Token deleted successfully", status=HTTP_200_OK)
        return Response("'username' field is required'", status=HTTP_400_BAD_REQUEST)


obtain_expiring_auth_token = ObtainExpiringAuthToken.as_view()
