from django.contrib import admin
from django.contrib.admin.filters import AllValuesFieldListFilter

from .models import Expense


class DropdownFilter(AllValuesFieldListFilter):
    template = 'admin/dropdown_filter.html'


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'user', 'category', 'mode', 'amount', 'details', 'updated', 'created')
    list_filter = ('date', 'user', 'category', 'mode')
    search_fields = ('date', 'user', 'category', 'mode', 'amount', 'details')
    fieldsets = (
        ('Expense details', {'fields': ('date', 'user', 'category', 'mode', 'amount', 'details')}),
    )
    add_fieldsets = fieldsets
    autocomplete_fields = ('user',)
    ordering = ('-date',)


admin.site.register(Expense, ExpenseAdmin)
