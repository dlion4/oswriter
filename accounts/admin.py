from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import Profile, CustomUser
from accounts.helper.forms import CustomUserCreationForm, CustomUserChangeForm

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    list_display = ['email', 'username', 'is_active', 'is_staff']
    fieldsets = (
        (None, {"fields": ("email", 'password')}),
        ("Permission", {"fields": ("is_staff", 'is_active')})
    )

    add_fieldsets = (
        (None, {"classes": ("wide", ), "fields": ("email", 'username', 'password1', 'password2')}),
        ("Permission", {"fields": ("is_superuser", "is_staff", "is_active")}),
    )

    search_fields = ("email", "username")
    ordering = ("email", )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user',]