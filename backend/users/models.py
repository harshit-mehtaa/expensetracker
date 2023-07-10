from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

IND_MOBILE_REGEX = r"^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$"
IND_PAN_REGEX = r"^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$"
IND_AADHAAR_REGEX = r"^\d{12}$"
IND_PINCODE_REGEX = r"^[1-9][0-9]{5}$"


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class UserContact(models.Model):
    id = models.AutoField(primary_key=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    mobile = models.CharField(
        max_length=10,
        validators=[RegexValidator(IND_MOBILE_REGEX, _('Enter a valid mobile number.'), 'invalid')],
        unique=True,
        blank=False,
        null=False
    )
    additional_mobile = models.CharField(
        max_length=10,
        validators=[RegexValidator(IND_MOBILE_REGEX, _('Enter a valid mobile number.'), 'invalid')],
        blank=True,
        null=True
    )
    additional_email = models.EmailField(
        max_length=254,
        blank=True,
        null=True
    )

    REQUIRED_FIELDS = ['mobile']

    def __str__(self):
        return f"Mobile: {self.mobile}"


class UserAddress(models.Model):
    class IndianStates(models.TextChoices):
        AN = 'Andaman and Nicobar Islands', 'Andaman and Nicobar Islands'
        AP = 'Andhra Pradesh', 'Andhra Pradesh'
        AR = 'Arunachal Pradesh', 'Arunachal Pradesh'
        AS = 'Assam', 'Assam'
        BR = 'Bihar', 'Bihar'
        CG = 'Chhattisgarh', 'Chhattisgarh'
        CH = 'Chandigarh', 'Chandigarh'
        DN = 'Dadra and Nagar Haveli', 'Dadra and Nagar Haveli'
        DD = 'Daman and Diu', 'Daman and Diu'
        DL = 'Delhi', 'Delhi'
        GA = 'Goa', 'Goa'
        GJ = 'Gujarat', 'Gujarat'
        HR = 'Haryana', 'Haryana'
        HP = 'Himachal Pradesh', 'Himachal Pradesh'
        JK = 'Jammu and Kashmir', 'Jammu and Kashmir'
        JH = 'Jharkhand', 'Jharkhand'
        KA = 'Karnataka', 'Karnataka'
        KL = 'Kerala', 'Kerala'
        LA = 'Ladakh', 'Ladakh'
        LD = 'Lakshadweep', 'Lakshadweep'
        MP = 'Madhya Pradesh', 'Madhya Pradesh'
        MH = 'Maharashtra', 'Maharashtra'
        MN = 'Manipur', 'Manipur'
        ML = 'Meghalaya', 'Meghalaya'
        MZ = 'Mizoram', 'Mizoram'
        NL = 'Nagaland', 'Nagaland'
        OD = 'Odisha', 'Odisha'
        PY = 'Puducherry', 'Puducherry'
        PB = 'Punjab', 'Punjab'
        RJ = 'Rajasthan', 'Rajasthan'
        SK = 'Sikkim', 'Sikkim'
        TN = 'Tamil Nadu', 'Tamil Nadu'
        TS = 'Telangana', 'Telangana'
        TR = 'Tripura', 'Tripura'
        UP = 'Uttar Pradesh', 'Uttar Pradesh'
        UK = 'Uttarakhand', 'Uttarakhand'
        WB = 'West Bengal', 'West Bengal'

    id = models.AutoField(primary_key=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    address = models.CharField(max_length=254, blank=False, null=False)
    city = models.CharField(max_length=254, blank=False, null=False)
    state = models.CharField(choices=IndianStates.choices, max_length=254, blank=False, null=False)
    pincode = models.CharField(
        max_length=6,
        validators=[RegexValidator(IND_PINCODE_REGEX, _('Enter a valid pincode.'), 'invalid')],
        blank=False,
        null=False
    )
    landmark = models.CharField(max_length=254, blank=True, null=True)

    REQUIRED_FIELDS = ['address', 'city', 'state', 'pincode']

    def __str__(self):
        return f"Address: {self.address}"


class UserKyc(models.Model):
    id = models.AutoField(primary_key=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    pan = models.CharField(max_length=10, validators=[RegexValidator(regex=IND_PAN_REGEX,
                                                                     message="Enter valid PAN",
                                                                     code="Invalid PAN")],
                           unique=True, blank=False, null=False)
    aadhar = models.CharField(max_length=12, validators=[RegexValidator(regex=IND_AADHAAR_REGEX,
                                                                        message="Enter valid Aadhaar",
                                                                        code="Invalid Aadhaar")],
                              unique=True, blank=False, null=False)

    REQUIRED_FIELDS = ['pan', 'aadhar']

    def __str__(self):
        return f"PAN: {self.pan}  AADHAR: {self.aadhar}"


class UserDetail(models.Model):
    class UserGender(models.TextChoices):
        MALE = 'Male', _('Male')
        FEMALE = 'Female', _('Female')

    id = models.AutoField(primary_key=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    gender = models.CharField(choices=UserGender.choices, max_length=6, blank=False)
    dob = models.DateField(blank=False)
    contact = models.OneToOneField(UserContact, on_delete=models.CASCADE, null=True, blank=True)
    kyc = models.OneToOneField(UserKyc, on_delete=models.CASCADE, null=True, blank=True)
    address = models.OneToOneField(UserAddress, on_delete=models.CASCADE, null=True, blank=True)

    REQUIRED_FIELDS = ['gender', 'dob', 'contact', 'kyc', 'address', ]

    def __str__(self):
        return f"DOB: {self.dob.__str__()}  Gender: {self.gender}  Mobile: {self.contact}  KYC: {self.kyc}"


class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    email = models.EmailField(unique=True, blank=False, null=True)
    name = models.CharField(max_length=100, blank=False)
    additional_info = models.OneToOneField(UserDetail, on_delete=models.CASCADE, blank=True, null=True)

    # admin
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    # non-editables
    first_name = models.TextField(editable=False, blank=False, null=True)
    middle_name = models.TextField(editable=False, blank=True, null=True)
    last_name = models.TextField(editable=False, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["name", ]

    objects = CustomUserManager()

    class Meta:
        unique_together = ["email", "first_name", "middle_name", "last_name", ]
        ordering = ["first_name", "middle_name", "last_name", ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        split_name = self.name.split(' ')
        if len(split_name) == 1:
            self.first_name = split_name[0]
        elif len(split_name) == 2:
            self.first_name = split_name[0]
            self.last_name = split_name[1]
        elif len(split_name) == 3:
            self.first_name = split_name[0]
            self.middle_name = split_name[1]
            self.last_name = split_name[2]
        else:
            self.first_name = split_name[0]
            self.middle_name = split_name[1]
            concat_name = ' '.join(split_name[2:])
            self.last_name = concat_name
        super(CustomUser, self).save(*args, **kwargs)
