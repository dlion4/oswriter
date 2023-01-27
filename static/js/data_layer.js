function DataLayerPushOrder2stepCustom($form, deadline, pages) {
    if (!(typeof dataLayer == 'object')) {
        return;
    }
    if (!(typeof $form == 'object')) {
        return;
    }

    var query = {
        'event': 'Ecommerce',
        'eventCategory': 'Conversion',
        'eventAction': 'click',
        'eventLabel': 'ProceedToSecurePayment',
        'ecommerce': {
            'currencyCode': 'USD',
            'add': {
                'products': [{
                        name: $form.find("select[name='type_of_paper']").find("option:selected").text(),
                        id: $form.find("select[name='type_of_paper']").find("option:selected").text() + " + " + deadline + " + " + $form.find("select[name='academic_level']").find("option:selected").text(),
                        price: parseFloat($form.find(".total-price").find('.price').text().replace("$", '')),
                        brand: deadline,
                        category: $form.find("select[name='academic_level']").find("option:selected").text(),
                        variant: pages + ' Pages',
                        quantity: 1
                    }]
            }
        }
    };

    dataLayer.push(query);
}



