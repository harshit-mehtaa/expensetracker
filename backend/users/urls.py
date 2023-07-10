from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.SimpleRouter()
router.register(r'contact', UserContactAPI)
router.register(r'kyc', UserKycAPI)
router.register(r'address', UserAddressAPI)
router.register(r'details', UserDetailAPI)
router.register(r'full', FullUserAPI)
router.register(r'', UserAPI)

urlpatterns = [
    path('GetNames/', UserNameListAPI.as_view()),
    path('GetStates/', GetAddressStates.as_view()),
    path('', include(router.urls)),
]
