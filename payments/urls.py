from django.urls import path
from . import views

app_name="payments"
urlpatterns = [
    path("<pk>/<slug>/", views.OrderConfirmView.as_view(), name="summary"),
    # path("<pk>/<slug>/", views.OrderConfirmView.as_view(), name="summary"),
    # path("settled/", views.payment, name="settled"),
]