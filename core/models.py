from django.db import models
from django.urls import reverse
from django.dispatch import receiver
from django.db.models.signals import post_save
class Order(models.Model):
    academic_level = models.CharField(max_length=100)
    type_of_paper = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    pages = models.PositiveIntegerField(default=1)
    words = models.PositiveIntegerField(default=275)
    deadline = models.DateTimeField()

    def __str__(self):
        return self.type_of_paper

    def get_absolute_url(self):
        return reverse("core:order-detail", kwargs={
            "pk": self.pk,
            "slug": self.slug
            } )

class OrderDetail(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="order_detail")
    subject = models.CharField(max_length=100, blank=True, null=True)
    slug = models.SlugField(max_length=100, blank=True)
    topic = models.CharField(max_length=100, blank=True, null=True)
    files = models.FileField(upload_to="orders/", blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    paper_format = models.CharField(max_length=100, blank=True, null=True)
    sources = models.PositiveIntegerField(default=0)
    ppt = models.PositiveIntegerField(default=0)
    cg = models.PositiveIntegerField(default=0, verbose_name="Charts Graphs")
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order.type_of_paper

    def get_absolute_url(self):
        return reverse("payments:summary", kwargs={
            "pk": self.pk,
            "slug": self.slug
            })


    @receiver(post_save, sender=Order)
    def post_save_order(sender, instance, created, **kwargs):
        if created:
            OrderDetail.objects.create(order=instance)
          



