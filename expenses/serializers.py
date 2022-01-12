from rest_framework.serializers import ModelSerializer

from .models import Expense


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        exclude = ['day', 'month', 'year', ]
