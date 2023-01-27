from . import views
from django.urls import path

app_name = "core"
urlpatterns = [
    path("", views.HomeLandingView.as_view(), name="home"),
    path("pricing/", views.PricingView.as_view(), name="prices"),
]