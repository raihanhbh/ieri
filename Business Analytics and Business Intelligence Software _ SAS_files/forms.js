var SAS = (function(SAS, $) {

	//declare local functions
	var formSelector="";
	var stateSelectSelector = "";
	var css = "is-hidden"; 

	/**
	 * This function grabs the empty eventContent div, 
	 * then retrieves the data attribute which holds the path to the form
	 */
	$(document).ready(function(){
		/*find the formID, then substring it based on index to look something like "salesforceform_start?"
		 *In some instances a random character sequence can be placed on the ID after salesforceform_start,
		 *causing the drop-downs to not hide as expected.
		 */ 
		formSelector = jQuery("input[name=':formid']").val();
		if(typeof formSelector != "undefined"){
			var index = formSelector.indexOf("salesforceform");
			if(index < 0 ) return; //if this isn't a salesforce form, then exit function.
			formSelector = formSelector.substring(index);
		}
		stateSelectSelector = "select[id$='"+formSelector+"_state']";

		//First make sure not to run in edit or design mode
		var editDesignMode = false;
		if(CQ.WCM) {
			if(CQ.utils.WCM.isEditMode() && CQ.utils.WCM.isDesignMode())
				editDesignMode=true;
		}
		if(!editDesignMode) {
			initialHide();
			$("select[id$='"+formSelector+"_country']").change(function() {
				handleChange();
			});
		}

		$(document.body).on('formLoad', function(){
			initialHide();
			$("body").on("change","select[id$='"+formSelector+"_country']", function() {
				handleChange();
			});
		});
	});

	/**
	 * This method is called and assigned to the on change listener for the Country dropdown.
	 * When the country has been changed, an appropriate action will be taken for the State dropdown.
	 */
	var handleChange = function(){
		//If country is not US,GB,blank or CA, remove the states dropdown
		var countryName = $("select[id$='"+formSelector+"_country']").val();
		var stateDiv = $("label[for$='"+formSelector+"_state']").parent().parent().parent().parent();
		if(countryName==="US") {
			unHide(stateDiv, "State");
		}
		else if(countryName==="GB") {
			unHide(stateDiv, "County");
		}
		else if(countryName==="CA") {
			unHide(stateDiv, "Province");
		}
		else if(countryName==="AU") {
			unHide(stateDiv, "Territory");
		}
		else if(countryName==="JP") {
			//ClientLibrary is malforming "都道府県", so we will decode it when writing to the page...
			unHide(stateDiv, decodeURIComponent("%E9%83%BD%E9%81%93%E5%BA%9C%E7%9C%8C")); 
		}
		else {
			var stateDD = $(stateSelectSelector);
			if(stateDD.length > 0){
				//Prevents missing state validation errors by adding a blank value to the state dropdown 
				stateDD.prepend("<option value='(No State)' ></option>");
				stateDD[0].selectedIndex = 0;
				stateDiv.addClass(css);
			}
		}
	};

	/**
	 * This method will hide the state dropdown as soon as the page is loaded.
	 */
	var initialHide = function(){
		$("label[for$='"+formSelector+"_state']").parent().parent().parent().parent().addClass(css);  	
	};

	/**
	 * This method will show the state drop down menu and rename the field label to the Country's respective area type ie: Province
	 */
	var unHide = function(stateDiv, areaType){
		var stateDD = $(stateSelectSelector);
		if(stateDD.length > 0){
			stateDD.find(" option[value='(No State)']").remove();
			stateDD[0].selectedIndex = 0;
			$("label[for$='"+formSelector+"_state']").html(areaType);
			stateDiv.removeClass(css);
		}
	};

	return SAS;
}(SAS || {}, jQuery));

jQuery(function ($) {
	//First make sure not to run in edit or design mode
	var editDesignMode = false;
	if(CQ.WCM) {
		if(CQ.utils.WCM.isEditMode() && CQ.utils.WCM.isDesignMode())
			editDesignMode=true;
	}
	if(!editDesignMode)	{
		var keepMeInformedDiv=$("input[name='User_News_Subscriber__c']").parent().parent().parent();
		//Start hidden
		keepMeInformedDiv.addClass("salesforce-form-hidden");
		$("select[name='00N30000003ofDn']").change(function() {
			var jmpUser = $("select[name='00N30000003ofDn']").val();
			if(jmpUser==="Yes")			
				keepMeInformedDiv.removeClass("salesforce-form-hidden");					
			else			
				keepMeInformedDiv.addClass("salesforce-form-hidden");
		});
	}
});
