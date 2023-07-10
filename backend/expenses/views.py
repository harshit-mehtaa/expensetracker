from datetime import datetime

from django.db.models import Sum
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.models import CustomUser
from .filters import ExpenseFilter
from .models import Expense
from .serializers import ExpenseSerializer

CURRENT_YEAR = datetime.now().year


class ExpensesAPI(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ExpenseFilter
    # filter_fields = "__all__"


# class ExpensesAPI(GenericAPIView):
#     serializer_class = ExpenseSerializer
#     queryset = Expense.objects.all()
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = '__all__'
#     ordering = ['-date', '-updated']
#
#     def get(self, request):
#         qs = self.filter_queryset(self.get_queryset())
#         # qs = self.get_queryset()
#         serialized_obj = self.get_serializer(instance=qs, many=True)
#         return Response({'data': serialized_obj.data, 'status': HTTP_200_OK})
#
#     def post(self, request):
#         serialized_obj = self.get_serializer(data=request.data)
#
#         if serialized_obj.is_valid(raise_exception=True):
#             try:
#                 serialized_obj.save()
#                 print(serialized_obj.data)
#                 return Response({'data': serialized_obj.data, 'status': HTTP_200_OK})
#             except Exception as E:
#                 print(E)
#                 return Response({'data': serialized_obj.errors, 'status': HTTP_400_BAD_REQUEST})
#
#     def update(self, request):
#         serialized_obj = self.get_serializer(data=request.data)
#         print(serialized_obj)
#         return Response({'data': serialized_obj.data, 'status': HTTP_200_OK})
#
#     def patch(self, request):
#         print("request:", request)
#         print("request.data:", request.data)
#         serialized_obj = self.get_serializer(request.data["id"], data=request.data, partial=True)
#         if serialized_obj.is_valid(raise_exception=True):
#             try:
#                 serialized_obj.save()
#                 return Response({'data': serialized_obj.data, 'status': HTTP_200_OK})
#             except Exception as E:
#                 print(E)
#                 return Response({'data': serialized_obj.errors, 'status': HTTP_400_BAD_REQUEST})


# class GetUsers(ListAPIView):
#     serializer_class = ExpenseSerializer
#     queryset = Expense.objects.all()
#
#     def get(self, request):
#         # return Response({'data': sorted([i.label for i in Expense.ExpenseUser]),
#         #                  'status': HTTP_200_OK})
#         return Response([i.label for i in Expense.ExpenseUser])


class GetCategories(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get(self, request):
        # return Response({'data': sorted([i.label for i in Expense.ExpenseCategory]),
        #                  'status': HTTP_200_OK})
        return Response(sorted([i.label for i in Expense.ExpenseCategory]))


class GetPaymentModes(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get(self, request):
        # return Response({'data': sorted([i.label for i in Expense.PaymentMode]),
        #                  'status': HTTP_200_OK})
        return Response(sorted([i.label for i in Expense.PaymentMode]))


class ExpensesByMonth(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    month_map = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    def get(self, request, *args, **kwargs):
        data = Expense.objects.filter(year=CURRENT_YEAR).values_list('date__month', ).annotate(Sum('amount')).order_by(
            'date__month')
        output = []
        prev_month = 0
        for row in data:
            if row[0] - 1 != prev_month:
                for month in range(prev_month + 1, row[0]):
                    output.append({self.month_map[month]: 0.0})
            prev_month = row[0]
            output.append({self.month_map[row[0]]: row[1]})
        return Response(output)


class ExpensesByYear(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get(self, request, *args, **kwargs):
        data = Expense.objects.all().values_list('date__year', ).annotate(Sum('amount')).order_by('date__year')
        output = [{row[0]: row[1]} for row in data]
        return Response(output)


class ExpensesByUser(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get(self, request, *args, **kwargs):
        data = Expense.objects.filter(year=CURRENT_YEAR).values_list('user', ).annotate(Sum('amount')).order_by('user')
        output = [{CustomUser.objects.get(id=row[0]).name: row[1]} for row in data]
        return Response(output)


class ExpensesByCategory(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get(self, request, *args, **kwargs):
        data = Expense.objects.filter(year=CURRENT_YEAR).values_list('category', ).annotate(Sum('amount')).order_by(
            'category')
        output = [{row[0]: row[1]} for row in data]
        return Response(output)


class ExpensesByMode(ListAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get(self, request, *args, **kwargs):
        data = Expense.objects.filter(year=CURRENT_YEAR).values_list('mode', ).annotate(Sum('amount')).order_by('mode')
        output = [{row[0]: row[1]} for row in data]
        return Response(output)
