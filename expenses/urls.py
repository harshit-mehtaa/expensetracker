from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.SimpleRouter()
router.register(r'', ExpensesAPI)

urlpatterns = [
    path('GetCategories/', GetCategories.as_view()),
    path('GetModes/', GetPaymentModes.as_view()),

    path('by-month', ExpensesByMonth.as_view()),
    path('by-year', ExpensesByYear.as_view()),
    path('by-user', ExpensesByUser.as_view()),
    path('by-category', ExpensesByCategory.as_view()),
    path('by-mode', ExpensesByMode.as_view()),

    path('', include(router.urls)),
]

# urlpatterns = router.urls
