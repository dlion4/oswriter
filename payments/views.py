from django.shortcuts import render
from django.views.generic import View
from  core.models import OrderDetail
from django.conf import settings
from cfe.settings import base
import braintree
from django.http import JsonResponse
# Create your views here.


class OrderConfirmView(View):
    template_name = "order/confirm.html"
    model = OrderDetail

    def get(self,*args, **kwargs):
        item = self.model.objects.get(pk=kwargs.get("pk"),slug=kwargs.get("slug"))
        # if settings.BRAINTREE_PRODUCTION:
        #     braintree_env = braintree.Environment.Production
        # else:
        # braintree_env = braintree.Environment.Sandbox
        #     # Configure Braintree
        # braintree.Configuration.configure(
        #     braintree_env,
        #     merchant_id=base.RAINTREE_MERCHANT_ID,
        #     public_key=base.BRAINTREE_PUBLIC_KEY,
        #     private_key=base.BRAINTREE_PRIVATE_KEY,
        # )
        
        # try:
        #     braintree_client_token = braintree.ClientToken.generate({ "order_id": item.id })
        # except:
        #     braintree_client_token = braintree.ClientToken.generate({})

        # context = {
        #     'braintree_client_token': braintree_client_token,
        #     "item": item
        #     }
        # print(context)
        return render(self.request, self.template_name, {"item": item})


# def payment(request):
#     nonce_from_the_client = request.POST['paymentMethodNonce']
#     customer_kwargs = {
#         "email": request.user.email,
#     }
#     customer_create = braintree.Customer.create(customer_kwargs)
#     customer_id = customer_create.customer.id
#     result = braintree.Transaction.sale({
#         "amount": "10.00",
#         "payment_method_nonce": nonce_from_the_client,
#         "options": {
#             "submit_for_settlement": True
#         }
#     })
#     print(result)
#     return JsonResponse('Ok')