from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView



class HomeLandingView(TemplateView):
    template_name = "core/index.html"


class PricingView(TemplateView):
    template_name = "core/prices.html"


class OrderItemView(TemplateView):
    template_name = "order/base.html"

    