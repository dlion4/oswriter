/*
 Author: VladBZ
 Usage:

 applied_list = ajaxList.init({
 // callAjax tartget to load data
 // data struct: {"list":{"max_pages":5,"data":[{id:1,name:'Vasya'},{id:1,name:'Petya'}]}}
 request_target: {controller:'order',method:'appliedByWriter'},

 // list holder, must contains .list-content and .list-pagination honders
 holder: $('.orders-list-applied-by-writer'),

 // page changed callback
 onPageChanged: function(page){ console.log('PAGE CHANGED TO '+page); },

 //store all data in ove var for template expl: {"file": {"id":"11","name":"Kunilingus.avi"}}
 //if not defined: {"id":"11","name":"Kunilingus.avi"}
 item_template_key : "file",

 // row template
 item_tamplate : $('#JSmart_template_ID')
 });

 applied_list.goTo(1); //to load list at 1-st page

 //JQuery JSmart ajaxLoad neaded!.

 */

ajaxList = {};

ajaxList.init = function(settings) {
	var list = {};
	list.holder = settings.holder;
	list.count = 0;
	list.request_target = {};
	list.request_target = settings.request_target;
	list.request_data = settings.request_data;
	list.item_template = settings.item_template;
	list.item_key = settings.item_key;
	list.pagination_holder = list.holder.find('.list-pagination');
	list.content_holder = list.holder.find('.list-content');
	list.is_first_request = true;
	list.template_additional_vars = settings.template_additional_vars;
	list.onPageChanged = function(page) {
	};
	list.max_pages = 0;
	list.current_page = 0;
	//console.log(list.content_holder);

	if (settings.onPageChanged)
		list.onPageChanged = settings.onPageChanged;

	list.goTo = function(page) {
		if (list.max_pages != 0 && list.max_pages < page) {
			console.error('requested Page(' + page + ') less than max_pages(' + list.max_pages + ')');
			return false;
		}
		if (!list.holder)
			return false;

		list.content_holder.html('<tr><td colspan="99"><p style="text-align:center;font-size:20px;color:grey;">'+
		'Loading, please wait...'+
		'<i style=" margin:0 auto;" class="icon-spin icon-spinner">'+
		'</i>'+
		'</p></td></tr>');
		callAjax('json', '/' + list.request_target.controller + '?ajax=' + list.request_target.method + '&page=' + page + '&first_request=' + list.is_first_request*1, function(data) {
			if(list.is_first_request) list.is_first_request = false;
			var tpl = new jSmart(list.item_template.html());
			list.content_holder.empty();
			for (i in data.list.data) {
				if(!settings.item_template_key){
					var template_values = {};
					template_values = data.list.data[i];
					template_values.current_user = CURRENT_USER;
					if (typeof ORDER != 'undefined') { template_values.order = ORDER }
					if (typeof USER_RIGHTS != 'undefined') { template_values.role_rights = USER_RIGHTS }
					if (typeof SITES != 'undefined') { template_values.sites = SITES }
					template_values.additional = list.template_additional_vars;
					item_html = tpl.fetch(template_values);
					//console.log(data.list.data[i]);
				}else{
					var key_name = settings.item_template_key;
					var template_values = {};
					template_values[key_name] = data.list.data[i];
					template_values.current_user = CURRENT_USER;
					if (typeof ORDER != 'undefined') { template_values.order = ORDER }
					if (typeof USER_RIGHTS != 'undefined') { template_values.role_rights = USER_RIGHTS }
					if (typeof SITES != 'undefined') { template_values.sites = SITES }
					template_values.additional = list.template_additional_vars;
					item_html = tpl.fetch( template_values );
					//console.log( template_values );
				}

				//console.log(item_html);

				list.content_holder.append(item_html);
			}
			list.current_page = page;
			list.count = data.list.count;
			if (data.list.max_pages && (list.max_pages != data.list.max_pages)) {
				list.max_pages = data.list.max_pages;
				list.rebuildPagination();
			} else {
				list.rebuildPagination();
			}

			list.onPageChanged(page);
		}, list.request_data);
	}

	list.currentPageChanged = function() {
		list.pagination_holder.find('li').removeClass('active');
		list.pagination_holder.find('a[target="' + list.current_page + '"]').closest('li').addClass('disabled');
		if (list.current_page <= 1)
			list.pagination_holder.find('a[target="prev"]').closest('li').addClass('disabled');
		if (list.current_page == list.max_pages)
			list.pagination_holder.find('a[target="next"]').closest('li').addClass('disabled');

	}

	list.rebuildPagination = function() {

		/*<ul>
		 <li class="disabled"><a href="#"><i class="icon-angle-left"></i></a></li>
		 <li class="active"><a href="#">1</a></li>
		 <li><a href="#">2</a></li>
		 <li><a href="#">3</a></li>
		 <li><a href="#">4</a></li>
		 <li><a href="#">5</a></li>
		 <li><a href="#"><i class="icon-angle-right"></i></a></li>
		 </ul>
		 */

		result = '';
		result += '<li><a href="#" target="prev">&laquo;</li>';
		var dots = false;
		//console.log("Current "+list.current_page);
		//console.log("Max "+list.max_pages);
		for (i = 1; i <= list.max_pages; i++) {
			if (i <= 2 || i >= (list.max_pages*1-1) || (i > (list.current_page*1-3) && i < (list.current_page*1+3))) {
				result += '<li><a href="#" target="' + i + '">' + i + '</a></li>';
				dots = true;
			} else {
				if(dots){
					dots = false;
					result += '<li><a>...</a></li>';
				}
			}
		}
		result += '<li><a href="#" target="next">&raquo;</a></li>'+(list.count? '<li><a>Total '+list.count+'</a></li>' : '');

		list.pagination_holder.empty()
			.html(result);

		list.pagination_holder.find('a[target]').click(function() {
			var page = $(this).attr('target');

			if (page.match(/\d+/)) {
				if (page == list.current_page)
					return false;
				list.goTo(page);
			} else if (page == 'next' && list.current_page < list.max_pages) {
				list.goTo(list.current_page * 1 + 1);
			} else if (page == 'prev' && list.current_page > 1) {
				list.goTo(list.current_page * 1 - 1);
			}
			return false;
			//console.log($(this).text());
		});
		list.currentPageChanged();
	}






	return list;
}

