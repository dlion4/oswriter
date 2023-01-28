from django.contrib import admin
from .models import Order, OrderDetail
# Register 


@admin.register(Order)
class AdminOrder(admin.ModelAdmin):
    list_display = ['academic_level', 'type_of_paper', 'pages', 'deadline']

    prepopulated_fields= {"slug": ("type_of_paper", )}


@admin.register(OrderDetail)
class AdminOrder(admin.ModelAdmin):
    list_display = ['order', 'price', 'subject', 'paper_format', 'sources',"ppt", "cg", "upload_date"]
    prepopulated_fields = {"slug": ("topic", )}
