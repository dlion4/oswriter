function count_price_local(data_form)
{
    var data_array = new Array();
    var data_array = data_form.split('&');
    var temp_var = new Array();

    var elem_form = new Array();
    elem_form = {
       'type_of_work':null,
       'academic_level':null,
       'type_of_paper':null,
       'questions':null,
       'problems':null,
       'pages':null,
       'slides':null,
       'spacing':null,
       'deadline':null,
       'preferred_writer':null,
       'previous_writer':null,
       'discount_code':null,
       'plagiarism_report':null,
       'abstract_page':null,
       'top_priority':null,
       'subject':null,
       'updates_via_sms':null,
       'editors_check':null,
       'package':null,
       'sources_needed':null,
       'charts':null,
       'standard-level_service' : null,
       'two_writers' : null,
       'plagiarism_report_turnitin': null,
       'basic_explanations_coef' : null
    }
    var temp;
    
    var top_academic_level =  new Array();
    top_academic_level = {13 : 10}
    
    $.each(data_array, function(i, val) {
        temp_var = data_array[i].split('=');
        elem_form[temp_var[0]]=temp_var[1];
    });

    var name_type_of_paper = $(ORDER_FORM_ID).find("[name='type_of_paper']").find("[value='"+elem_form['type_of_paper']+"']").text().toLowerCase().trim();
	         
    if($.inArray(name_type_of_paper,['admission essay','personal statement','application letter','cover letter','resume','curriculum vitae'])>-1){
        elem_form['academic_level'] = ((!isNaN(top_academic_level[client_id])?top_academic_level[client_id]:5)*1+100*client_id)*1;
    }
            
    var tow_coef = type_of_work_coef[client_id+'_'+elem_form['type_of_work']];
    if(elem_form['type_of_work'] == '7' && $("input[name='order_feedback_short']").length){
        tow_coef = 0.6;
    }
    var ald_coef = ac_level_deadline_coef[elem_form['academic_level']+'_'+elem_form['deadline']];
    var top_coef = type_of_paper_coef[client_id+'_'+elem_form['type_of_paper']];
    var top_deadline_ald_coef = type_of_paper_ac_level_deadline_coef[elem_form['type_of_paper']+'_'+elem_form['deadline']+'_'+elem_form['academic_level']];
    if(top_deadline_ald_coef == undefined)
    {
        top_deadline_ald_coef = 1;
    }  
        
    if(ald_coef!=0) {
        name_top_lower = name_type_of_paper.toLowerCase();
        if($.inArray('104',[4,17,8,12,14])>-1 && $.inArray(elem_form['subject'],['1','14','35','38','19','36','29'])>-1  && !($.inArray(elem_form['deadline'],['10415','10433','10434'])>-1 && elem_form['academic_level']=='10401') && elem_form['type_of_work']==1){
            ald_coef =1+ald_coef;
        }
        if(name_type_of_paper == 'capstone project'  && !(elem_form['academic_level']=='10401' && ($.inArray(elem_form['deadline'],['10415','10433','10434'])>-1))){
            ald_coef =2+ald_coef;
        }
        if($.inArray(104,[8,9,10,11,18,14,15,94,104])>-1 && (name_top_lower == 'course work' || name_top_lower == 'coursework') ){
            ald_coef =1+ald_coef;
        }
        if('104' == 4 || '104' == 6  || '104' == 17 ){
            if($.inArray(name_top_lower,['thesis','thesis proposal','thesis statement'])>-1 && !(elem_form['academic_level']=='10401' && ( $.inArray(elem_form['deadline'],['10415','10433','10434'])>-1) )){
                ald_coef =2+ald_coef;
            }
        }
        if(name_top_lower == 'other'){
            ald_coef = 1 + ald_coef;
        }
    }
    
    ald_coef = correctPriceBySubject(elem_form['subject'],ald_coef);

    var mcq = (name_type_of_paper== "multiple choice questions");    
    var coef_round = 1;
    if(elem_form['academic_level'] == 406 && elem_form['deadline'] == 439){
        var coef_round = 2;	
    }
    //var coef_round = 2;	
    var coef_for_slides = 1;
    if(name_type_of_paper == 'poster presentation'){
        var coef_for_slides =  Math.round( Math.round(1.5 * ald_coef) * tow_coef);
    }
    
    if((elem_form['academic_level']==1501 && ($.inArray(elem_form['deadline'],['1515','1533','1534'])>-1)) || 
       (('104' == 4 || '104' == 9) && (elem_form['type_of_paper']!=  '104' * 10000 + 1039) && (elem_form['academic_level']== '10406' || elem_form['academic_level']== '10401')  && (elem_form['deadline']=='10439' || elem_form['deadline']=='10433' || elem_form['deadline']=='10434'))){
      //var coef = (mcq) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef)).toFixed(2) :  ( (top_coef * ald_coef).toFixed(2) * tow_coef).toFixed(2);
        var coef = (mcq) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(2) :  (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(2);
        coef = coef*1;
        coef_round = 2;
    }else if ((elem_form['type_of_paper']!=  '104'* 10000 + 1054) && (elem_form['type_of_paper'] !=  '104' * 10000 + 1039) &&   '104' !=15 && '104' !=12 && '104' !=19 && '104' !=8 && (elem_form['academic_level']=='10401' || elem_form['academic_level']==406) && (elem_form['deadline']=='10415' || elem_form['deadline']=='10433' || elem_form['deadline']=='10434')){
	var coef = (mcq) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef)  * parseFloat(top_deadline_ald_coef)).toFixed(2) :  (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(tow_coef)  * parseFloat(top_deadline_ald_coef)).toFixed(2);
        coef = coef*1;
        coef_round = 2;	
    }else{        
        if(elem_form['academic_level'] == 406 && elem_form['deadline'] == 439){
            var coef = (mcq) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef) ).toFixed(2) :   (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(top_deadline_ald_coef)).toFixed(2);
        }else{
            var coef = (mcq) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(1) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef) ).toFixed(1) :  Math.round( Math.round(top_coef * ald_coef) * tow_coef * parseFloat(top_deadline_ald_coef));
        }                 
        coef = coef*1;
    }

    var pd_pages = 0;
    var count_pages = 0;
    if(elem_form['pages'] != undefined  && parseInt(elem_form['pages'])>0 )
    {
        pd_pages = parseFloat(elem_form['pages']);
        count_pages = parseFloat(elem_form['pages']);
    }
    var coef_plus =0;
    var result_all = new Array();

    if( (elem_form['pages'] != undefined && parseInt(elem_form['pages'])>0 && !isNaN(parseInt(elem_form['pages']))  ) ||  (elem_form['slides'] != undefined && parseInt(elem_form['slides'])>0 && !isNaN(parseInt(elem_form['slides'])) )  )
    {
        result_all["page"] = coef.toFixed(coef_round);
        result_all["page_total"] = Math.round(coef * parseFloat(elem_form['pages']));
        result_all["slide"] = (coef / 2);
        result_all["slide_total"] = Math.round(coef * (parseFloat(elem_form['slides']) / 2).toFixed(1));
        if (elem_form['spacing'] == 1) {
            result_all["page"] = coef * 2;
            result_all["page_total"] = Math.round(coef * parseFloat(elem_form['pages']));
            elem_form['pages'] = parseFloat(elem_form['pages']) * 2;
            pd_pages = pd_pages * 2;
        }
        if(name_type_of_paper == 'poster presentation'){
            var pages_str = parseFloat(elem_form['pages'])*1;
            var slides_str = parseFloat(elem_form['slides'])*1;
        }else{
            var units = parseFloat(elem_form['pages']) + parseFloat(elem_form['slides']*1) * 0.5; 
        }
        var coef_plus = pd_pages;				  
    }else if(elem_form['problems'] != undefined && !isNaN(parseInt(elem_form['problems']))){
        var units = parseInt(elem_form['problems']);
        var coef_plus = parseFloat(elem_form['problems']) ;			  
    }else if(elem_form['questions'] != undefined && !isNaN(parseInt(elem_form['questions']))){
        var units = parseInt(elem_form['questions']);
	var coef_plus = parseFloat(elem_form['questions']) ;			  
    }else {
        var units = parseInt(0);
    }
     
    if(name_type_of_paper == 'poster presentation'){ 
        var result = ((coef * pages_str) + (coef_for_slides * slides_str)).toFixed(coef_round);
    }else{     
        var result = (mcq) ? (coef * units).toFixed(coef_round) : (coef * units).toFixed(coef_round);
    }
    
    result_all['base_price'] = (result*1).toFixed(2)*1;
    var price_without_bundles = result;
    
    var save_bundle = 0;
    var bundle_rate = 1;
    var tmp;

    if (elem_form['preferred_writer'] == 2 && elem_form['plagiarism_report'] == 1 && elem_form['top_priority'] == 1 &&  elem_form['abstract_page']  == 1 && 
        ((elem_form['pages'] != undefined && parseInt(elem_form['pages'])>0 ) ||  (elem_form['slides'] != undefined && parseInt(elem_form['slides'])>0))) 
    {
        // bundle_rate = 0.85;   //15 %
    }
     
    if(elem_form['charts']){
        var charts_cost  =parseFloat(coef * (parseFloat(elem_form['charts'])* 0.5).toFixed(2));
        result = parseFloat(result) + parseFloat(charts_cost * bundle_rate).toFixed(2)*1;
        result_all['charts'] = charts_cost;
        result_all['base_price'] = result;
    }     
    
    if (elem_form['preferred_writer'] == 2) {
        var pref_writer_coef = bundles_coef[client_id+'_1'];
        temp =result * 0.58;
        tmp = temp.toFixed(2)*1;       
        temp =tmp * bundle_rate;
        result_all['top_writer'] = parseFloat(temp.toFixed(2))*1;
        temp = parseFloat(result) +  parseFloat(temp.toFixed(2))*1;
        result = parseFloat(temp).toFixed(2);
        save_bundle = parseFloat(parseFloat(save_bundle)*1 + parseFloat(parseFloat(tmp) * (1 - parseFloat(bundle_rate))).toFixed(2)).toFixed(2)*1;        
    }

    if (elem_form['preferred_writer'] == 4) {
        temp =result * 0.3;
        tmp = temp.toFixed(2)*1;       
        temp =tmp * bundle_rate;
        result_all['advanced_writer'] = parseFloat(temp.toFixed(2))*1;
        temp = parseFloat(result) +  parseFloat(temp.toFixed(2))*1;
        result = parseFloat(temp).toFixed(2);
        save_bundle = parseFloat(parseFloat(save_bundle)*1 + parseFloat(parseFloat(tmp) * (1 - parseFloat(bundle_rate))).toFixed(2)).toFixed(2)*1;        
    }   
    
    result_all['basic_writer'] = 0;
    if(elem_form['preferred_writer'] == 1){
        result_all['basic_writer'] = 1;
    }
                        
    if ((pd_pages) < 1) {
        result_all['plag'] = parseFloat(0);
    } else if (pd_pages <= 10) {
        result_all['plag'] =  parseFloat(bundles_coef[client_id+'_4']);
    } else {
        result_all['plag'] = parseFloat(pd_pages) - 0.01;
    }
             
    if ( !((count_pages < 1 && elem_form['slides'] < 1 ))) {
        result_all['plag'] = new_extra_price('plagiarism_report',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
    }             
             
    if (elem_form['plagiarism_report'] == 1) {
        result = (parseFloat((parseFloat(result_all['plag']) * bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2);
        save_bundle += parseFloat(result_all['plag']) * (1 - bundle_rate).toFixed(2) * 1;
        result_all['plagiarism_report'] = result_all['plag'];
    } else {
        result_all['plagiarism_report_default_price'] = result_all['plag'];

    }

    if (elem_form['plagiarism_report_turnitin'] == 1) {
        var plagiarism_report_turnitin_coef = bundles_coef[client_id + '_24'];
        result = (parseFloat((parseFloat(plagiarism_report_turnitin_coef)  * bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2);
        save_bundle += parseFloat(plagiarism_report_turnitin_coef) * (1 - bundle_rate).toFixed(2)*1;
        result_all['plagiarism_report_turnitin'] = plagiarism_report_turnitin_coef;
    } else{
        result_all['plagiarism_report_turnitin'] = null;
    }
    
    if (elem_form['abstract_page'] == 1) {
        var abstract_page_coef = new_extra_price('abstract_page',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
        result = (parseFloat((parseFloat(abstract_page_coef) * bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2);
        save_bundle += (parseFloat(abstract_page_coef) * (1 - bundle_rate)).toFixed(2)*1;
        result_all['abstract_page'] = parseFloat((parseFloat(abstract_page_coef) * bundle_rate).toFixed(2));
    }else{
        var abstract_page_coef = new_extra_price('abstract_page',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
        result_all['abstract_page_default_price'] = parseFloat(abstract_page_coef.toFixed(2))*1;  
    }

    if (elem_form['top_priority'] == 1) {
        var top_prior_coef = new_extra_price('top_priority',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
        result = (parseFloat((parseFloat(top_prior_coef)* bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
        save_bundle += (parseFloat(top_prior_coef) * (1 - bundle_rate)).toFixed(2)*1;      
        result_all['top_priority'] = parseFloat((parseFloat(top_prior_coef)* bundle_rate).toFixed(2));
    }else{
        var top_prior_coef = new_extra_price('top_priority',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
        result_all['top_priority_default_price'] = parseFloat(top_prior_coef.toFixed(2))*1;  
    }
    
    
    if (elem_form['updates_via_sms'] == 1 && !(('104' == 6 || '104' == 11) && elem_form['top_priority'] == 1)) {  
        if(elem_form['top_priority'] == 1){
            result_all['updates_via_sms'] = 'Free';
        }else{
            var updates_via_sms_coef = bundles_coef[client_id+'_12'];
            result = (parseFloat((parseFloat(updates_via_sms_coef)* bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
            save_bundle += (parseFloat(updates_via_sms_coef) * (1 - bundle_rate)).toFixed(2)*1;     
            result_all['updates_via_sms'] = parseFloat((parseFloat(updates_via_sms_coef)* bundle_rate).toFixed(2));
        }
    }else{
        if(elem_form['top_priority'] == 1){
            result_all['updates_via_sms_default_price'] = 'Free';
        }else{
            var updates_via_sms_coef = bundles_coef[client_id+'_12'];
            result_all['updates_via_sms_default_price'] = parseFloat((parseFloat(updates_via_sms_coef)* bundle_rate).toFixed(2));
        }       
    }            
    
    if (elem_form['editors_check'] == 1) {
        temp =price_without_bundles * 0.3;        
        tmp = temp.toFixed(2)*1;
        temp =tmp * bundle_rate;
        result_all['editors_check'] = parseFloat(temp.toFixed(2))*1;
        temp = parseFloat(result) +  parseFloat(temp.toFixed(2))*1;
        result = parseFloat(temp).toFixed(2);
        save_bundle += (parseFloat(tmp) * (1 - bundle_rate)).toFixed(2)*1;        
    }else{
        temp_edit =price_without_bundles * 0.3;        
        tmp_edit = temp_edit.toFixed(2)*1;
        temp_edit =tmp_edit * bundle_rate;
        result_all['editors_check_default_price'] = parseFloat(temp_edit.toFixed(2))*1;  
    }
    
    if (elem_form['table_of_contents'] == 1 ) {        
        var table_of_contents_coef = new_extra_price('table_of_contents',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
        result = (parseFloat((parseFloat(table_of_contents_coef)* bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
        save_bundle += (parseFloat(table_of_contents_coef) * (1 - bundle_rate)).toFixed(2)*1;     
        result_all['table_of_contents'] = parseFloat((parseFloat(table_of_contents_coef)* bundle_rate).toFixed(2));
    }else{
        var table_of_contents_coef = new_extra_price('table_of_contents',price_without_bundles,count_pages,elem_form['spacing'],elem_form['slides']);
        result_all['table_of_contents_default_price'] = parseFloat(table_of_contents_coef.toFixed(2))*1;  
    }

    if (elem_form['sources_used'] == 1 ) {        
        if(!elem_form['sources_needed'] || (elem_form['sources_needed'] && elem_form['sources_needed'] == 0)){
            result_all['sources_used'] = 'Free';
        }else{
            var sources_used_coef = bundles_coef[client_id+'_10'];
            result = (parseFloat((parseFloat(sources_used_coef)* bundle_rate * elem_form['sources_needed']).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
            save_bundle += (parseFloat(sources_used_coef) * elem_form['sources_needed'] * (1 - bundle_rate)).toFixed(2)*1;     
            result_all['sources_used'] = parseFloat((parseFloat(sources_used_coef)*elem_form['sources_needed']* bundle_rate).toFixed(2));
        }        
    }
    
    if (elem_form['basic_explanations'] == 1 && parseInt(elem_form['problems']) > 0) {                
        var basic_explanations_coef = bundles_coef[client_id+'_31'];
        result = (parseFloat((parseFloat(basic_explanations_coef)* bundle_rate * elem_form['problems']).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
        save_bundle += (parseFloat(basic_explanations_coef) * elem_form['problems'] * (1 - bundle_rate)).toFixed(2)*1;     
        result_all['basic_explanations'] = parseFloat((parseFloat(basic_explanations_coef)*elem_form['problems']* bundle_rate).toFixed(2));        
    }      
    
      //service layers part
    if (elem_form['standard-level_service'] == 1) {
        result_all['standard-level_service'] = 1;
    } else{
        result_all['standard-level_service'] = null;
   }
   // end service layers part
   
    if (elem_form['two_writers'] == 1) {   
        result_all['two_writers'] = parseFloat((result*0.7).toFixed(2))*1        
        result_all['full_price_with_order_duplicate'] = (result*2).toFixed(2)*1;
        result = result*1 + result_all['two_writers']*1; 
    }
   
    if(result=='NaN') result=0;	 
    
    result = (result*1).toFixed(2)*1;
            
    return {'price':result,'plag':result_all['plag'],'save_bundle':save_bundle.toFixed(2),
        'base_price':result_all['base_price'],'top_priority':result_all['top_priority'],
        'abstract_page':result_all['abstract_page'],'updates_via_sms':result_all['updates_via_sms'],
        'editors_check':result_all['editors_check'],
        'plagiarism_report':result_all['plagiarism_report'],'table_of_contents':result_all['table_of_contents'],
        'sources_used':result_all['sources_used'],'charts':result_all['charts'],
        'top_writer':result_all['top_writer'],'advanced_writer':result_all['advanced_writer'],
        'editors_check_default_price':result_all['editors_check_default_price'],'updates_via_sms_default_price':result_all['updates_via_sms_default_price'],
        'plagiarism_report_default_price':result_all['plagiarism_report_default_price'], 'basic_writer':result_all['basic_writer'], 'standard_level_service' : result_all['standard-level_service'],
        'full_price_with_order_duplicate':result_all['full_price_with_order_duplicate'],'two_writers':result_all['two_writers'],
        'top_priority_default_price':result_all['top_priority_default_price'],
        'abstract_page_default_price':result_all['abstract_page_default_price'],
        'table_of_contents_default_price':result_all['table_of_contents_default_price'],plagiarism_report_turnitin: result_all['plagiarism_report_turnitin'],
        'basic_explanations':result_all['basic_explanations']};
}


function new_extra_price(name_extra, price_without_bundles, count_pages, spacing, slides){
    slides = slides*1;
    var price_extra = 0;
    switch (name_extra) {
        case "table_of_contents":
            if(   (spacing == 1 && (count_pages + slides)>=5) 
               || (spacing == 2 && (count_pages + 0.5*slides)>=10)   
            ) {
                price_extra = roundDecimal((9.99*1.5).toFixed(3)*1, 2);
              } else {
                price_extra =  bundles_coef[client_id+'_4'];

              }
          break;
        case "abstract_page":  
            if(   (spacing == 1 && (count_pages + slides)>=5) 
               || (spacing == 2 && (count_pages + 0.5*slides)>=10)   
            ) {
                price_extra = roundDecimal((14.99*1.5).toFixed(3)*1, 2);
              } else {
                price_extra = bundles_coef[client_id+'_2'];
              }
                break;
        case "top_priority":
        if(    (spacing == 1 && (count_pages + slides)>=5) 
            || (spacing == 2 && (count_pages + 0.5*slides)>=10)   
        ) {
            price_extra = roundDecimal((14.99*1.5).toFixed(3)*1, 2);
          } else {
            price_extra = bundles_coef[client_id+'_3'];
          }
            break;
        case "plagiarism_report": 
          if(spacing == 1 && (count_pages + slides)>=5) {              
                price_extra = roundDecimal((9.99 * 1.5 + ((count_pages + slides) * 2 - 10)).toFixed(3)*1, 2);
          }else if(spacing == 2 && (count_pages + 0.5*slides)>=10){
                price_extra = roundDecimal((9.99 * 1.5 + ((count_pages + 0.5*slides) - 10)).toFixed(3)*1, 2);
          }else {
             price_extra = bundles_coef[client_id+'_4'];
          }
          break;
    } 
    return price_extra;
}

function roundDecimal(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

/*For page prices START*/
function count_price_local_page_prices(ac_lvl, top, deadline,tow,adm_help,quest,probl,quest_probl, slides, package, top_other, subject)
{
    var question = null;
    var problem = null;
    var pages = (quest_probl)?parseInt(quest_probl):1;
    var slides = (slides)?parseInt(slides):0;
    var top_other =  top_other ? top_other : 0;

    if(adm_help){ac_lvl='10401';top='1040014'; }
    if(quest){tow=1;question=(quest_probl)?parseInt(quest_probl):1;pages=null; top='1041038';}
    if(probl){tow=1;problem=(quest_probl)?parseInt(quest_probl):1;pages=null;  top='1041039';}
    if (top=='1041054'){tow=1;probl=1;problem=(quest_probl)?parseInt(quest_probl):1;pages=null;}
    var elem_form = new Array();
    elem_form = {
        'type_of_work':tow,
        'academic_level':ac_lvl,
        'type_of_paper':top,
        'questions':question,
        'problems':problem,
        'pages':pages,
        'slides':slides,
        'spacing':2,
        'deadline':deadline,
        'preferred_writer':1,
        'previous_writer':null,
        'discount_code':null,
        'plagiarism_report':null,
        'abstract_page':null,
        'top_priority':null
    }
    var temp;
    
    var top_academic_level =  new Array();
    //top_academic_level = {8 : 8, 13 : 10}
    top_academic_level = {13 : 10}

    if(adm_help){
        elem_form['academic_level'] = ((!isNaN(top_academic_level[client_id])?top_academic_level[client_id]:5)*1+100*client_id)*1;
    }
        
    var tow_coef = type_of_work_coef[client_id+'_'+elem_form['type_of_work']];
    var ald_coef = ac_level_deadline_coef[elem_form['academic_level']+'_'+elem_form['deadline']];
    var top_coef = type_of_paper_coef[client_id+'_'+elem_form['type_of_paper']];
    var top_deadline_ald_coef = type_of_paper_ac_level_deadline_coef[elem_form['type_of_paper']+'_'+elem_form['deadline']+'_'+elem_form['academic_level']];
    
    if(subject != undefined && !isNaN(parseInt(subject))){
        ald_coef = correctPriceBySubject(subject,ald_coef);
    }       
    
    var package_choosen = false;
    var package_coef = false;
    if(typeof package !== 'undefined' && typeof(package_deadline_coef) !== 'undefined' && typeof package_deadline_coef === 'object' && package_deadline_coef.constructor === Object 
            && !(Object.getOwnPropertyNames(package_deadline_coef).length === 0)
            && !(top =='1041038' || top =='1041039'))
    {
        package_choosen = package;
        package_coef = package_deadline_coef[package+'_'+elem_form['deadline']];
        ald_coef = package_coef;        
    }   
    
    if(ald_coef != 0 && top_other){
        ald_coef = 1 + ald_coef;
    }
    
    if(top_deadline_ald_coef == undefined)
    {
        top_deadline_ald_coef = 1;
    }      
    var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(1) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(1) :  Math.round( Math.round(top_coef * ald_coef) * tow_coef * parseFloat(top_deadline_ald_coef));
    //var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(1) * parseFloat(tow_coef)).toFixed(1) :  Math.round( Math.round(top_coef * ald_coef) * tow_coef);
     
    var coef_round = 1;
    var coef_for_slides = 1;
    if(elem_form['academic_level'] == 406 && elem_form['deadline'] == 439){
        var coef_round = 2;	
    }    
    if(top == '1041045'){
        var coef_for_slides =  Math.round( Math.round(1.5 * ald_coef) * tow_coef);          
    }    
    //var coef_round = 2;	
    if((elem_form['academic_level']==1501 && elem_form['deadline']==1515) || 
      (('104' == 4 || '104' == 9) && (elem_form['type_of_paper']!=  '104' * 10000 + 1039) && (elem_form['academic_level']=='10406' || elem_form['academic_level']=='10401')  && (elem_form['deadline']== '10439' || elem_form['deadline']=='10433' || elem_form['deadline']=='10434'))){
        var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(2) :  (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(2);
        //var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef)).toFixed(2) :  (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(tow_coef)).toFixed(2);
        coef = coef*1;
        coef_round = 2;
    }else if((elem_form['type_of_paper']!=  '104'* 10000 + 1054) && (elem_form['type_of_paper']!=  '104'* 10000 + 1039) &&  '104'!=15 && '104' !=12 && '104'!=19 && '104'!=8 && (elem_form['academic_level']=='10401' || elem_form['academic_level']==406) && elem_form['deadline']=='10415'){
        var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(2) :  (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(2);        
        coef = coef*1;
        coef_round = 2;
    }else{
        if(elem_form['academic_level'] == 406 && elem_form['deadline'] == 439){
            var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(2) * parseFloat(tow_coef)).toFixed(2) :  (mnog_mod(top_coef,ald_coef).toFixed(2) * parseFloat(tow_coef)).toFixed(2);
        }else{
            var coef = (quest) ?   ((parseFloat(top_coef) * parseFloat(ald_coef)).toFixed(1) * parseFloat(tow_coef) * parseFloat(top_deadline_ald_coef)).toFixed(1) :  Math.round( Math.round(top_coef * ald_coef) * tow_coef * parseFloat(top_deadline_ald_coef));            
        }                 
        coef = coef*1;		
    }
     
    var pd_pages = 0;
    if(elem_form['pages'] != undefined  && parseInt(elem_form['pages'])>0 )
    {
        pd_pages = parseFloat(elem_form['pages']);
    }
    
    var result_all = new Array();
    if( (elem_form['pages'] != undefined && parseInt(elem_form['pages'])>0 && !isNaN(parseInt(elem_form['pages']))  ) ||  (elem_form['slides'] != undefined && parseInt(elem_form['slides'])>0 && !isNaN(parseInt(elem_form['slides'])) )  )
    {
        result_all["page"] = coef.toFixed(coef_round);
        result_all["page_total"] = Math.round(coef * parseFloat(elem_form['pages']));
        result_all["slide"] = (coef / 2);
        result_all["slide_total"] = Math.round(coef * (parseFloat(elem_form['slides']) / 2).toFixed(1));
        if (elem_form['spacing'] == 1) {
            result_all["page"] = coef * 2;
            result_all["page_total"] = Math.round(coef * parseFloat(elem_form['pages']));
            elem_form['pages'] = parseFloat(elem_form['pages']) * 2;
            pd_pages = pd_pages * 2;
        }
        var units = parseFloat(elem_form['pages']) + parseFloat(elem_form['slides']*1) * 0.5;    
    }else if(elem_form['problems'] != undefined && !isNaN(parseInt(elem_form['problems']))){
        var units = parseInt(elem_form['problems']);
    }else if(elem_form['questions'] != undefined && !isNaN(parseInt(elem_form['questions']))){
        var units = parseInt(elem_form['questions']);
    }else {
        var units = parseInt(0);
    }
    
    if(top == '1041045'){ 
       var pages_str = parseFloat(elem_form['pages'])*1;
       var slides_str = parseFloat(elem_form['slides'])*1;
       var result = ((coef * pages_str) + (coef_for_slides * slides_str)).toFixed(coef_round);
    }else{     
       var result = (quest) ? (coef * units).toFixed(coef_round) : (coef * units).toFixed(coef_round);
    }    
    
    var save_bundle = 0;
    var bundle_rate = 1;
    var tmp;

    if (/*client_id == 4 && elem_form['preferred_writer'] > 1*/ elem_form['preferred_writer'] == 2 && elem_form['plagiarism_report'] == 1 && elem_form['top_priority'] == 1 &&  elem_form['abstract_page']  == 1 && 
        ((elem_form['pages'] != undefined && parseInt(elem_form['pages'])>0 ) ||  (elem_form['slides'] != undefined && parseInt(elem_form['slides'])>0))) {
                bundle_rate = 0.85;
    }
     
    if (elem_form['preferred_writer'] == 2 && (!package_choosen || (package_choosen && package_choosen!=2))) {
        var pref_writer_coef = bundles_coef[client_id+'_1'];
        /*if (client_id == 4) {
            temp =result * 0.58;
            tmp = temp.toFixed(2);
        } else {
            temp = result * parseFloat(pref_writer_coef);
            tmp = temp.toFixed(2);
        }*/

        temp =result * 0.58;
        tmp = temp.toFixed(2)*1;

        temp =tmp * bundle_rate;
        temp = parseFloat(result) +  parseFloat(temp.toFixed(2));
        result = parseFloat(temp).toFixed(2);
        save_bundle = parseFloat(parseFloat(save_bundle)*1 + parseFloat(parseFloat(tmp) * (1 - parseFloat(bundle_rate))).toFixed(2)).toFixed(2)*1;
    }
            
    if ((pd_pages) < 1) {
        result_all['plag'] = parseFloat(0);
    } else if (pd_pages <= 10) {
        result_all['plag'] =  parseFloat(bundles_coef[client_id+'_4']);
    } else {
        result_all['plag'] = parseFloat(pd_pages) - 0.01;
    }
       
    if (elem_form['plagiarism_report'] == 1 && (!package_choosen || (package_choosen && package_choosen!=2 && package_choosen!=3))) {
        result = (parseFloat((parseFloat(result_all['plag']) * bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2);
        save_bundle += parseFloat(result_all['plag']) * (1 - bundle_rate).toFixed(2)*1;
    }
       
    if (elem_form['abstract_page'] == 1 && (!package_choosen || (package_choosen && package_choosen!=2 && package_choosen!=3))) {
        var abstract_page_coef = bundles_coef[client_id+'_2'];
        result = (parseFloat((parseFloat(abstract_page_coef) * bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
        save_bundle += (parseFloat(abstract_page_coef) * (1 - bundle_rate)).toFixed(2)*1;
    }
    
    if (elem_form['top_priority'] == 1 && (!package_choosen || (package_choosen && package_choosen!=3))) {
        var top_prior_coef = bundles_coef[client_id+'_3'];
        result = (parseFloat((parseFloat(top_prior_coef)* bundle_rate).toFixed(2)) + parseFloat(result)).toFixed(2)*1;
        save_bundle += (parseFloat(top_prior_coef) * (1 - bundle_rate)).toFixed(2)*1;      
    }
    
    if(getDecimal(result)==0) result = Math.round(result);
    
    if(result=='NaN') result=0;
    
    return result;
}
/*For page prices END*/

function mnog_mod (value1, value2)
{
    return parseFloat(value1)*100*100* parseFloat(value2)/(100*100);
}

function getDecimal(input) {
    return input - (input ^ 0);
}

function correctPriceBySubject(subject,price){
    //if($.inArray('104',['10','17','6','11'])>-1){                    
        switch (subject) {
            case "4": //Art &amp; architecture
                price = price + 2;
              break;
            case "38": //Engineering
            case "35": //Chemistry 
            case "36": //Physics
            case "55": //Linguistics
            case "61": //Logistics
            case "59": //Computer science
            case "45": //Programming
            case "29": //Technology
            case "66": //Supply Chain Management
            case "69": //Design
                price = price + 5;
                break;
            case "34": //Biology
            case "51": //Geology
            case "40": //Statistics
                price = price + 3;
                break;
        } 
    //}
    return price;  
}
