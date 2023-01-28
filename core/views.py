from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from datetime import datetime
# Create your views here.
from django.views.generic import TemplateView
from .models import Order, OrderDetail
from django.utils.text import slugify

class HomeLandingView(TemplateView):
    template_name = "core/index.html"


class PricingView(TemplateView):
    template_name = "core/prices.html"


class OrderItemView(TemplateView):
    template_name = "order/order.html"
    def post(self, *args, **kwargs):
        academic_level=self.request.POST["level"]
        type_of_paper=self.request.POST["paper"]
        pages=int(self.request.POST["pages"])
        deadline=self.request.POST["deadline"]
        date = datetime.strptime(deadline, "%m/%d/%Y").date()
        print(academic_level, type_of_paper, pages, date)
        order, created = Order.objects.get_or_create(
            academic_level=academic_level,
            type_of_paper=type_of_paper,
            slug=slugify(type_of_paper),
            pages=pages,
            deadline=date,
        )
        # print(order, created)
        order.save()
        item = Order.objects.get(pk=order.pk)
        if item:
            return JsonResponse({
                "data": dict(Order.objects.values().get(pk=order.pk)),
                "path": item.get_absolute_url(),
                })
        # return JsonResponse({"data": str(item)})
    
class OrderDetailAddView(TemplateView):
    template_name = "order/order_detail.html"
    model = Order

    def get_object(self, **kwargs):
        order = self.model.objects.get(pk=kwargs.get("pk"), slug=kwargs.get("slug"))
        return order
    
    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)
        context['order'] = self.get_object(**kwargs)
        return context

    def post(self, *args, **kwargs):
        obj = self.get_object(**kwargs)
        item = OrderDetail.objects.get(order=obj)
        item.subject=self.request.POST['subject']
        item.topic=self.request.POST['topic']
        item.files = self.request.FILES.getlist("filesupload")
        item.instructions=self.request.POST['instructions']
        item.paper_format=self.request.POST['paper_format']
        item.sources=self.request.POST['sources']
        item.ppt=self.request.POST['ppt']
        item.cg=self.request.POST['cg']
        item.slug=slugify(self.request.POST['topic'])
        item.price=34.00
        item.save()
        return JsonResponse({
            "data": dict(OrderDetail.objects.values().get(pk=item.pk)),
            "path": item.get_absolute_url(),
            })


    
