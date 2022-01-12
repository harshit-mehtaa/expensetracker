from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        self.model = self.get_model()

        try:
            token = self.model.objects.get(key=key)
        except self.model.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        # This is required for the time comparison
        timezone_now = timezone.now()

        if token.created < timezone_now - timedelta(seconds=settings.TOKEN_EXPIRY_TIME):
            raise AuthenticationFailed('Token has expired')

        return token.user, token
