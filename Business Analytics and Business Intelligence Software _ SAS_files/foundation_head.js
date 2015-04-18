/**
 * Get the request URL parameters as an array
 * @returns {Array}
 */
function getUrlParams() {
    var parms = [], elem, ndx, max;
    
    var splits = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    max = splits.length;
    
    for (ndx = 0; ndx < max; ndx += 1) {
        elem = splits[ndx].split('=');
        parms.push(elem[0]);
        parms[elem[0]] = elem[1];
    }
    return parms;
}


function getHostName() {
    var url = "" + window.location;
    var cq_host = url.match(/^https?:\/\/[^\/]+/);
    
    //return cq_host + "/etc/forms/referencedata/test_data/formPrefill.json";
    return cq_host;
}

    jQuery(document).ready(function() {   	

        jQuery("body").moveDescriptions();

    });

jQuery.fn.moveDescriptions = function() {

    jQuery('div.form_row_description').filter(function(index) {
        return jQuery('span', this).length > 0;
    }).each(function(formRowDesc) {
        var descrip = jQuery(this).find('span').text();
        var newspan = jQuery('<span class="form_row_description">' + descrip + '</span>');
        
        jQuery(this).parent().find('div.form_leftcol').find('label').after(newspan);
        jQuery(this).hide();
    });

	var error = "this field is required";

	jQuery("div.form_leftcolmark:contains('*')").each(function(leftColMark) {
		var asteriskspan = '<span class="required">*</span>';
		jQuery(this).prev('div.form_leftcollabel').find('label').append(asteriskspan);
		error = jQuery(this).parent().parent().parent().find('div.form_error').text(); 
		jQuery(this).hide();
		var newerror = jQuery('<span class="form_error">' + error + '</span>');
		if (error){
			jQuery(this).closest('div.form_row').find('input,select,textarea').each(function (insel) {
				jQuery(this).last().after(newerror);
				jQuery(this).addClass('required');
			});	
		} 
	});

	jQuery('div.form_error:parent').hide();

};
/**
 * Override the ootb cq5forms_isEmpty function.
 * This is used by ootb clientside validation to 
 * detect if a field is empty. 
 *
 * @param obj
 *            FIELD object - the form field to check.
 */
function cq5forms_isEmpty(obj) {
    /* return false if field not present */
    if ( obj == undefined ) {
        return false;
    }
    var empty = true;
    var fieldType = jQuery(obj).attr('type');
    var objLength = jQuery(obj).length;
    
    /* return false if field is zero length or has only spaces */ 
    var checkString = function(field) {
        if (field.length == 0) {
            return false;
        }
        for (var i = 0; i < field.length; i++) {
            if (field.charAt(i) != ' ')
                return true;
        }
        return false;
    };

    if ( objLength > 1 ) {
        for(var i=0;i<objLength;i++) {
            if (obj[i].type == "radio" || obj[i].type == "checkbox" ) {
                if (obj[i].checked) {empty = false;}
            } else {
                if ( checkString( obj[i].value ) ) {empty = false;}
            }
        }
    } else {
        if (fieldType == "radio" || fieldType == "checkbox" ) {
            if (obj.checked) {empty = false;}
        } else {
            if ( checkString( jQuery(obj).attr('value') ) ) {empty = false;}
        }
    }
    return empty;
}

/**
 * Override the ootb cq5forms_showMsg function.
 * This is used by ootb clientside validation to 
 * display error message below a form field. 
 *
 * @param fid
 *            String - id of the form.
 * @param field
 *            String - name of the field.
 * @param msg
 *            String - message to display.
 * @param index
 *            Integer - index of field to focus on (not often used).
 */
function cq5forms_showMsg(fid, field, msg, index) {
    var f = document.forms[fid].elements[field];
    var form = jQuery("#" + fid); 
    var currentField = form.find(f);
    var parentRow = currentField.closest("div.form_row").last();     
    var formError = "<p class='form_error'>" + clientFormValidationError() + "</p>";
    var newRow = "<div class='form_row'>";
        newRow += "<div class='form_leftcol' style='display: none;'></div>";
        newRow += "<div class='form_rightcol'><label for='" + field + "'><span class='form_error'>" + msg + "</span></label></div>";
        newRow += "</div>";   
    /* remove any previous validation message so user sees only 1 at a time */
    jQuery(".form_error").remove();
    /* add message above first field */
    jQuery("form div.form").append( formError );
    /* add new message below field */
    parentRow.after( newRow );
    /* move focus to field that needs to be filled */
    if ( jQuery( currentField ).length > 1 ) {
        /* radio group or checkbox group */
        if ( !index ) index = 0;
        f[index].focus();
    } else {
        f.focus();
    }
}

jQuery(function($) {
    // ** If we wait for 'ready' - the abacus logic will have already removed
    // ** the composite form field
    $('form > div.parbase.standardfields.section').each(function(i, child) {
        $(child).removeClass('section');
    });

    $(document.body).on('formLoad', function(){
        performPrefill();
    });
    
    $(document).ready(function() {
        performPrefill();
    });
    
    var performPrefill = function(){
        //variable to store prefill data that is returned
        var prefillData = null;
        
        // process only if there is a form in the page
        var elem = $('input:hidden[name=":formstart"]');
        if (elem === undefined || elem === null || elem.length < 1) {
            return;
        }
        var form = elem.closest('form')[0];

        var version = jQuery.browser.version;
        var isIE7or8 = false;
        if ( jQuery.browser.msie && (version=="8.0" || version=="7.0") ) {
            isIE7or8 = true;
        }
                
        /* Don't reset fields when page shows validation error: */
        if ( !($('p.form_error').length > 0) ) {
            
            /* Fix abacus bug in IE7-IE8 where checkboxes/radios showing checked on form entry.  
             * This blows away any author set defaults as 
             * well as registrant settings for those fields on a form
             * if they have a validation error on the form. Sufficient for now. */
            if ( isIE7or8 ) {
                /* reset ALL checkboxes/radios to not checked */
                $(':checkbox').each(
                    function() {
                        $(this).prop('checked', false);
                    }
                );
                $(':radio').each(
                    function() {
                        $(this).prop('checked', false);
                    }
                );
            }
        
            /* Fix for problems caused by abacus: 
             * 1: dropdowns showing not any first option at form entry. First option's value is null (all browsers).
             * 2: dropdowns showing last option at form entry, aka zimbabwe bug (IE7-IE8 only).
             * Reset ALL selects to their first option. */
            $('select').each(
                function() {
                    var value = $(this).val();
                    if ( value == null || isIE7or8 ) {
                        $(this).removeAttr('selected');
                        $(this)[0].selectedIndex = 0; 
                    }
                }
            );
        }
        
        var ck = new Date().getTime();
        //var ck = 1405457163591;
        var isJmpForm = jQuery("input[name='00N1400000BBR4Y']").length > 0 ? "&jmp=true" : "";
        $.ajax({
            url : "/services/formPrefill?ck="+ck+isJmpForm,
            dataType : "json",
            async : false,
            success : function(data, txtStatus, xhr) {
            	//Display the opt-in checkbox in author mode
            	if(CQ.WCM){
            		jQuery('.optincheckbox.saswwwcheckbox div:first').removeClass("is-hidden");
            	}else if (data && !jQuery.isEmptyObject(data)){
                    prefillData = data;
                    if(prefillData != null){
                        fillFormData(prefillData, form);
                    }
                    
                    /**
                     * If prefill data has an email and it's not opted in then display the opt-in checkbox
                     */
                    if(prefillData.email){
                        if(jQuery("input[name='noMailReason']").length > 0 && !isOptedIn(prefillData.email)){
                            jQuery('.optincheckbox.saswwwcheckbox div:first').removeClass("is-hidden");
                        }
                    }else{
                    	if(jQuery(".saswwwtext.text.emailaddress input[name='email']").val()){
                            var email = jQuery(".saswwwtext.text.emailaddress input[name='email']").val();
                            if(!isOptedIn(email)){
                                jQuery('.optincheckbox.saswwwcheckbox div:first').removeClass("is-hidden");
                            }
                        }else{
                            bindOnBlurToEmail();                    
                        }
                    }

                    // ** The second invocation is to handle the case where there
                    // ** were hide/show rules defined and the prefill caused 'new'
                    // ** form fields to appear. We want those 'new' form fields
                    // ** to be populated as well.

                    //OOTB functionality needs to call fillFormData twice, since Abacus can remove and write new elements to the DOM
                    //fillFormData(data, form);
                }else{
                    if(jQuery(".saswwwtext.text.emailaddress input[name='email']").val()){
                        var email = jQuery(".saswwwtext.text.emailaddress input[name='email']").val();
                        if(!isOptedIn(email)){
                            jQuery('.optincheckbox.saswwwcheckbox div:first').removeClass("is-hidden");
                        }
                    }else{
                        bindOnBlurToEmail();                    
                    }
                }
            	
            },
            error : function(xhr, txtStatus, error) {
                //console.log("No form Prefill data");
                // alert("Error getting form prefill data: " + error);
            },
            complete : function() {
                //console.log("Completed Prefill AJAX request");
            }
        });
        
        //updates the prefill State once the State dropdown has been populated after the prefill Country has been filled.
        $('body').on('changedStateDropdown', function(){
            if(prefillData != null){
                fillFormData(prefillData, form);
            }
        });
    };    
    
});

/**
 * 
 * Where the form element 'name' attribute will match the 'data' element name.
 * When there is a corresponding form element for a 'data' element, the 'data'
 * element is removed.
 * 
 * @param data
 *            JSON Data - see above for format
 * @param form
 *            FORM Object
 * @param $
 *            jQuery Object
 */
function fillFormData(data, form) {
    var formName = jQuery(form).attr('name');
    var formSelect = "#" + formName + " input, #" + formName + " textarea, #"
            + formName + " select";
    // go through each field in form
    jQuery(formSelect).each(
            function(i, child) {
                
                var name = jQuery(child).attr('name'), // form field name
                type = jQuery(child).attr('type'), // form field type
                oldVal = jQuery(child).val(); // form field current value
                if (name !== undefined && name !== null) {
                    var value = data[name];
                    if(name === "zip"){
                        value = data['postalCode'];
                    } else if(name === "title"){
                        value = data['jobTitle'];
                    } else if(name === "00N30000003nwae"){
                        value = data['department'];
                    } else if (name === "00N30000003ofDn"){
                        value = data['jmpUser'];
                    } else if (name === "User_News_Subscriber__c"){
                        value = data['userSubscribe'];
                    } else if (name === '00N1400000BBR4d'){ 
                        value = data['profileId'];
                    } else if(name === '00N1400000BBR4Y'){
                    	 value = data['jmpFormPrefillId'];
                    } else if (name === "Address"){        //salesforce uses "Address", but the json object returns "address" uncapitalized.
                        if (data['address']) {
                            value = data['address'];
                        } else if (data['mailingAddress1']) {
                              value = data['mailingAddress1'];
                              if (data['mailingAddress2']) {
                                  value = value + ", " + data['mailingAddress2'];
                              }  
                              if (data['mailingAddress3']) {
                                  value = value + ", " + data['mailingAddress3'];
                              }  
                          }
                    }

                    if (value !== undefined && value !== null) {
                        if(name === "00N1400000BBR4Y"){
                            jQuery(".form_row.cq-form-hidden-placeholder .form_rightcol:contains('"+name+"')").text(name+" - "+value);
                        }
                        try {
                            if (isInputTypeClickable(type)) {
                                if (oldVal === value) {
                                    jQuery(child).attr('checked', true)
                                            .trigger(
                                                    createEvent("click",
                                                            "false", "true",
                                                            "checked"));
                                    delete data[name];
                                }
                            } else {
                                jQuery(child).val(value).trigger(
                                        createEvent("change", oldVal, value,
                                                "value"));
                                //if the form element has successfully updated, then delete the value to keep from being re-processed.
                                if(jQuery(child).val() === value && name !== 'email'){
                                    delete data[name];
                                }
                            }
                        } catch (e) {
                            // log the exception
                        }
                    }
                }

            });
}

function isInputTypeClickable(type) {
    return type && (type === "radio" || type === "checkbox");
}

function createEvent(eventName, oldVal, newVal, propertyName) {
    var oevt = jQuery.Event(eventName, {});
    var event = jQuery.Event(eventName, {
        newValue : newVal,
        oldValue : oldVal,
        propertyName : "value",
        originalEvent : oevt
    });
    return event;
}

function isOptedIn(email){
    var optedIn = false;
    jQuery.ajax({
        url : "/services/optInVerification?email="+email,
        dataType : "json",
        async : false,
        success : function(data, txtStatus, xhr) {
            if (data){
                optedIn = data;
            }
        },
        error : function(xhr, txtStatus, error) {
        }
    });
    return optedIn;
}

/**
 * This function binds an 'onBlur' event to the email input field
 * for the Standard Form Fields
 */
function bindOnBlurToEmail(){
    jQuery(".saswwwtext.text.emailaddress input[name='email']").bind(' blur',function(e){
        var email = jQuery(this).val();
        if(email && !isOptedIn(email)){
            jQuery('.optincheckbox.saswwwcheckbox div:first').removeClass("is-hidden");
        }else if(email && isOptedIn(email) && !jQuery('.optincheckbox.saswwwcheckbox div:first').hasClass("is-hidden")){
            jQuery('.optincheckbox.saswwwcheckbox div:first').addClass("is-hidden");
        }
    }); 
}
/* Set the html select options for standarfields/state based on selection of country */
/* The countries that have state/province/territory are US, CA, JP and AU */
/* In etc/forms/referencedata/dropdown_values/countries/states, there are value=text arrays for each of those 4 countries */

jQuery(function ($) {
    $(document).ready(function() { /* the placement of this function in standardfields/clientlibs
                                     means this code will be driven on each registrant click */
        /* when country dropdown value selected (so jquery change()) */
        $('select').filter(function() {    /* for all SELECT html statements that contain "country" in the name */
                return this.name.match(/country/);
            }).change(function(){          /* html form "select" (dropdown) for field named country - when it changes */
                var countryfieldname = $(this).attr('name');  /* get name of country pulldown */
                var statefieldname = getStateFieldName(countryfieldname);  /* determine name of matching state pulldown */
                var countrycode = $(this).val();            /* get 2 char country code selected using dropdown */
                
                var stateloadpath = getDropDownOptionsURL(countrycode);    /* call function below to get stateloadpath json given 2 char code */
                $.ajax({                                    /* ajax call to load new state options or clear them out */
                    url: stateloadpath,
                    dataType: "json",
                    async: false,
                    success: function(data, txtStatus, xhr) {
                        populateStates(data[countrycode], statefieldname);                            
                    },
                    error: function(xhr, txtStatus, error) {
                        clearStateOptions();
                    }
                });
             });         
        
     
    
    $('select').filter(function() {    /* for all SELECT html statements that contain "country" in the name */
        return this.name.match(/country/);
    }).each(function(){          /* html form "select" (dropdown) for field named country - when it changes */
        var countryfieldname = $(this).attr('name');  /* get name of country pulldown */
        var statefieldname = getStateFieldName(countryfieldname);  /* determine name of matching state pulldown */
        var countrycode = $(this).val();            /* get 2 char country code selected using dropdown */
        var statecode = $('select[name=' + statefieldname + ']').val();
        var stateloadpath = getDropDownOptionsURL(countrycode);    /* call function below to get stateloadpath json given 2 char code */
        $.ajax({                                    /* ajax call to load new state options or clear them out */
            url: stateloadpath,
            dataType: "json",
            async: false,
            success: function(data, txtStatus, xhr) {
                populateStates(data[countrycode], statefieldname);    
                $('select[name=' + statefieldname + ']').val(statecode);
                $('body').trigger('changedStateDropdown');
            },
            error: function(xhr, txtStatus, error) {
                clearStateOptions();
            }
        });
     });         

  });
});


/**
 * Get the URL of dropdown options
 * @returns {String URL} of JSON
 */
function getDropDownOptionsURL(countrycode) {
    var stateloadpath = "/etc/forms/referencedata/dropdown_values/countries/states/" + countrycode + ".json"; 
    return stateloadpath;
}

/**
 * Using the casing of "country" in fieldname, determine the matching statefieldname
 */
function getStateFieldName(countryfieldname) {
  var statefieldname = '';
  
  if (countryfieldname.search(/country/) != -1) {
      statefieldname = countryfieldname.replace('country', 'state');
  } else if (countryfieldname.search(/Country/) != -1) {
      statefieldname = countryfieldname.replace('Country', 'State');
  } else if (countryfieldname.search(/COUNTRY/) != -1) {
      statefieldname = countryfieldname.replace('COUNTRY', 'STATE');
  }  
  return statefieldname;
}

/**
 * clear the <SELECT NAME=STATE*> <OPTION>s
 */
function clearStateOptions(statefieldname) {
    var stateoption = jQuery('select[name=' + statefieldname + ']');
    if ( stateoption === undefined || stateoption === null ) {
        return;
    }
    jQuery(stateoption).find('option').remove();                /* clear out existing options for state */
    return stateoption;
}

/**
 * When called by Ajax, populate <SELECT NAME=STATE> <option> values by converting each input that looks like this:
 *     "=Please select","AL=Alabama","AK=Alaska"
 *
 * to <option value="" >Please select</option>
 *    <option value="AL" >Alabama</option>
 *    <option value="AK" >Alaska</option>
 */
function populateStates(statearray, statefieldname) {
    var i, max;
    if ( statearray === undefined || statearray === null ) return;    /* when there is no state values list */
    
    var stateoption = clearStateOptions(statefieldname);
    
    var opts = null;  /* opts is small array for each value=name */
    
    /* older versions of IE need the menu options updated a little differently */
    if (jQuery.browser.msie && (jQuery.browser.version=="8.0" || jQuery.browser.version=="7.0" || jQuery.browser.version=="6.0")) {
            
        for (i = 0, max=statearray.length; i < max; i++) {
            opts = statearray[i].split('=');    /* split statearray array on value=name to create opts array */   
            if (opts.length < 2) {              /* if only 1 obj returned, then only value was specified, not value=name  */
                opts.push(opts[0]);             /* so set name=value */
            }
            jQuery('<option/>', {
                value: opts[0],
                text: opts[1]
            }).appendTo('select[name=' + statefieldname + ']');
        }
    } else {
        for (i = 0, max=statearray.length; i < max; i++) {
            opts  = statearray[i].split('=');                        /* split statearray array on value=name to create opts array */   
            if (opts.length < 2) {                                   /* if only 1 obj returned, then only value was specified, not value=name  */
                opts.push(opts[0]);                                  /* so set name=value */
            }
            stateoption.append(new Option(opts[1], opts[0]));        /* keep adding options until no more in input array */
        }
    }
}
