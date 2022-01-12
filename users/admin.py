from django.contrib import admin

from .models import *


class UserContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'mobile', 'additional_mobile', 'additional_email', 'updated', 'created')
    search_fields = list_display
    fieldsets = (
        ('Primary contact details', {'fields': ('mobile',)}),
        ('Additional contact details', {'fields': ('additional_mobile', 'additional_email')}),
    )
    add_fieldsets = fieldsets
    ordering = ('mobile',)


admin.site.register(UserContact, UserContactAdmin)


class UserKycAdmin(admin.ModelAdmin):
    list_display = ('id', 'pan', 'aadhar', 'updated', 'created')
    search_fields = list_display
    fieldsets = (
        ('KYC details', {'fields': ('pan', 'aadhar')}),
    )
    add_fieldsets = fieldsets
    ordering = ('id',)


admin.site.register(UserKyc, UserKycAdmin)


class UserAddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'address', 'city', 'state', 'pincode', 'updated', 'created')
    search_fields = list_display
    fieldsets = (
        ('Address details', {'fields': ('address', 'city', 'state', 'pincode')}),
    )
    add_fieldsets = fieldsets
    ordering = ('id',)


admin.site.register(UserAddress, UserAddressAdmin)


class UserDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'gender', 'dob', 'contact', 'kyc', 'address', 'updated', 'created')
    search_fields = list_display
    fieldsets = (
        ('Additional user details', {'fields': ('gender', 'dob', 'contact', 'kyc', 'address')}),
    )
    add_fieldsets = fieldsets
    autocomplete_fields = ('contact', 'kyc', 'address',)
    ordering = ('id',)


admin.site.register(UserDetail, UserDetailAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'additional_info', 'is_staff', 'is_superuser', 'is_active', 'last_login',
                    'updated', 'created')
    search_fields = list_display
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'last_login')
    fieldsets = (
        ('Personal info', {'fields': ('name', 'password', 'email')}),
        ('Additional info', {'fields': ('additional_info',)}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
    )
    add_fieldsets = fieldsets
    autocomplete_fields = ('additional_info',)
    ordering = ('name',)


admin.site.register(CustomUser, UserAdmin)
