from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import CustomUser


class Expense(models.Model):
    # class ExpenseUser(models.TextChoices):
    #     HARSHIT = 'Harshit', 'Harshit'
    #     SNEHA = 'Sneha', 'Sneha',
    #     DHIREN = 'Dhiren', 'Dhiren'
    #     PAULOMI = 'Paulomi', 'Paulomi'
    #     ROMA = 'Roma', 'Roma'

    class ExpenseCategory(models.TextChoices):
        CLOTHES = 'Clothes', _('Clothes')
        COMMUTE = 'Commute', _('Commute')
        COOK = 'Cook', _('Cook')
        DAIRY = 'Diary', _('Diary')
        DOCTOR = 'Doctor', _('Doctor')
        ELECTRICITY = 'Electricity', _('Electricity')
        FOOD = 'Food', _('Food')
        FUEL = 'Fuel', _('Fuel')
        GAS = 'Gas', _('Gas')
        GARDENING = 'Gardening', _('Gardening')
        GROCERY = 'Grocery', _('Grocery')
        GYM = 'Gym', _("Gym")
        INTERNET = 'Internet', _('Internet')
        INVESTMENT = 'Investment', _('Investment')
        LAUNDRY = 'Laundry', _('Laundry')
        MAID = 'Maid', _('Maid')
        MEDICINE = 'Medicine', _('Medicine')
        MISCELLANEOUS = 'Miscellaneous', _('Miscellaneous')
        MOBILE = 'Mobile', _('Mobile')
        OTT = 'OTT', _('OTT')
        PARKING = 'Parking', _('Parking')
        SNACKS = 'Snacks', _('Snacks')
        TELEVISION = 'Television', _('Television')
        TESTS = 'Tests', _('Tests')
        TRANSFER = 'Transfer', _('Transfer')
        VEGETABLE = 'Vegetable', _('Vegetable')
        WATER = 'Water', _('Water')

    class PaymentMode(models.TextChoices):
        UPI = 'UPI', _('UPI')
        CASH = 'Cash', _('Cash')
        CREDIT = 'Credit', _('Credit')
        DEBIT = 'Debit', _('Debit')
        GPAY = 'GPay', _('GPay')
        PAYTM = 'Paytm', _('Paytm')
        NET_BACKING = 'Net Banking', _('Net Banking')
        AUTO_DEBIT = 'Auto Debit', _('Auto Debit')

    id = models.AutoField(primary_key=True)
    date = models.DateField(blank=False, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False)
    category = models.CharField(choices=ExpenseCategory.choices, max_length=20, blank=False, null=True)
    mode = models.CharField(choices=PaymentMode.choices, max_length=20, blank=False, null=True)
    amount = models.DecimalField(max_digits=30, decimal_places=2, blank=False, null=True)
    details = models.TextField(blank=False, null=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    day = models.PositiveSmallIntegerField(editable=False, blank=False, null=True)
    month = models.PositiveSmallIntegerField(editable=False, blank=False, null=True)
    year = models.PositiveSmallIntegerField(editable=False, blank=False, null=True)

    class Meta:
        unique_together = ["date", "user", "category", "mode", "amount", "details"]
        ordering = ['-date', '-created']

    def save(self, *args, **kwargs):
        self.day = self.date.strftime('%d')
        self.month = self.date.strftime('%m')
        self.year = self.date.strftime('%Y')
        super().save(*args, **kwargs)
