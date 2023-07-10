from django_filters.rest_framework.filters import *
from django_filters.rest_framework.filterset import FilterSet

from .models import Expense
from django_filters.widgets import RangeWidget

LOOKUP_CHOICES = [
    ('exact', 'Equals'),
    ('gt', 'Greater than'),
    ('lt', 'Less than'),
    ('gte', 'Greater than or equal to'),
    ('lte', 'Less than or equal to'),
    ('range', 'Range'),
    ('in', 'In'),
    ('isnull', 'Is null'),
    ('regex', 'Regular expression'),
    ('iregex', 'Case insensitive regular expression'),
    ('search', 'Search'),
    ('icontains', 'Case insensitive contains'),
    ('contains', 'Contains'),
    ('startswith', 'Starts with'),
    ('endswith', 'Ends with'),
    ('istartswith', 'Case insensitive starts with'),
    ('iendswith', 'Case insensitive ends with'),
]


class ExpenseFilter(FilterSet):
    date = DateFromToRangeFilter(widget=RangeWidget(attrs={'type': 'date'}))
    # date__gte = DateFilter(field_name='date', lookup_expr='gte')
    # date__lte = DateFilter(field_name='date', lookup_expr='lte')
    user = AllValuesFilter(field_name='user')
    category = ChoiceFilter(field_name='category', choices=Expense.ExpenseCategory.choices)
    mode = ChoiceFilter(field_name='mode', choices=Expense.PaymentMode.choices)
    amount = LookupChoiceFilter(field_name='amount', lookup_choices=LOOKUP_CHOICES)
    details = AllValuesFilter(field_name='details')

    class Meta:
        model = Expense
        fields = "__all__"
