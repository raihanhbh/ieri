jQuery(function ($) {
    $(document).ready(function() {
        var simid = jQuery.cookie("sassimid");
        $("a[href]").each(function(i, elm) {
            var m = elm.href.match(/cvent\.com/i);
            if (m !== null) {                
                if (!simid) {
                    simid = "999999";
                }
                console.log("rewriting cvent url");
                var q = elm.href.match(/\?/);
                if (q !== null) {
                    elm.href = (elm.href + "&Refid=" + simid);
                } else {
                    elm.href = (elm.href + "?Refid=" + simid);
                }
                
            }
        });
    });
});
jQuery(function ($) {
    $(document).ready(function () {
        //iterate through the tabwrappers and assign functionality
        $(".tabwrapper").each(function () {
            // the tabwrapper div
            var tabctrl = $(this);
            
            function switchTab(event) {
                //prevent the default behaviour of scrolling to the hash
                event.preventDefault();
                // $(this) in case is the tag generating the call
                var link = $(this);
                var newItem = link.closest("li");
                var oldItem = tabctrl.find("ul.mod-tabs li.active");
                var newContent = tabctrl.find('[id="'+link.attr("href").substr(1)+'"]');
                var oldContent = tabctrl.find("section.tabctrl-content:visible");
                
                if (!newItem.is(oldItem)) {
                    oldItem.removeClass("active");
                    newItem.addClass("active");
                    // make the visible URL have an anchor in case people cut/paste URL:
                    location.hash = encodeURIComponent(newItem.attr("id").substr(3));
                }
                
                oldContent.removeClass("active");
                newContent.addClass("active");
                // if collapse/expand
                if ($(this).parents(".tabwrapper").find(".tabctrl-collapse-wrapper").length) {
                    var collapser = $(this).parents(".tabwrapper").find(".tabctrl-collapse-wrapper");
                    if (collapser.hasClass("is-collapsed")) {
                        collapser.removeClass("is-collapsed");
                    }
                }
            }
            
            function switchTabByHash(link) {
                var newItem = link.closest("li");
                var oldItem = tabctrl.find("ul.mod-tabs li.active");
                var newContent = tabctrl.find('[id="'+link.attr("href").substr(1)+'"]');
                var oldContent = tabctrl.find("section.tabctrl-content:visible");
                var collapser = link.parents(".tabwrapper").find(".tabctrl-collapse-wrapper");
                var switchtab = true;
                if (collapser.length > 0) {
                    if (collapser.hasClass("is-collapsed")) {
                        switchtab = false;
                    }
                }
                if (switchtab === true) {
                    if (!newItem.is(oldItem)) {
                        oldItem.removeClass("active");
                        newItem.addClass("active");
                    }
                    oldContent.removeClass("active");
                    newContent.addClass("active");
                }
            }
            function loadCarousel(tabctrl) {
                tabctrl.find(".carouselwrapper").each(function () {
                    $(this).removeAttr("style");
                    var carouselID = $(this).attr("id");
                    CarouselLoader["createSwipe_" + carouselID]();
                    if (tabctrl.find(".nav-buttons").length > 0) {
                        CarouselLoader["initPrevNext_" + carouselID]();
                    }
                });
            }
            $(window).on("hashchange", function () {
                var hash, pos, a, href;
                hash = decodeURIComponent(window.location.hash);
                pos = hash.indexOf("#");
                if (pos > -1) {
                    if (hash !== "") {
                        // replace spaces with hyphens
                        href = "tabcontent_" + hash.substr(1);
                        a = tabctrl.find("ul.mod-tabs a[href='#" + href + "']").last();
                    } else {
                        a = tabctrl.find("ul.mod-tabs a").first();
                    }
                    // we should have the anchor value at this point, pass the anchor object
                    if (a.length == 1) {
                        switchTabByHash(a);
                    }
                }
            });
            // Initialization: bind switchTab function to clicking on tabwrapper
            tabctrl.find("ul.mod-tabs a").bind("click.tabwrapper", switchTab);
            var currentItem = tabctrl.find("ul.mod-tabs li:first");
            var currentContent = tabctrl.find("section.tabctrl-content:first");
            var collapsible = false;
            if (tabctrl.find("div.tabctrl-collapse-wrapper").length) {
                // collapse/expand class
                tabctrl.find("a.collapse-close").click(function () {
                    tabctrl.find("div.tabctrl-collapse-wrapper").addClass("is-collapsed");
                    tabctrl.find("section.tabctrl-content").removeClass("active");
                    tabctrl.find("ul.mod-tabs li.active").removeClass("active");
                });
                collapsible = true;
            }
            if (collapsible === false) {
                // find anchor passed in on URL?
                var URLanchor = decodeURIComponent(window.location.hash).substring(1);
                var scrollLauncher = decodeURIComponent(window.location.hash) + "scroll";
                if (URLanchor !== "tab" && $("#li_" + URLanchor).length) {
                    // just in case first tab isn't the anchor, make sure it isn't active
                    tabctrl.find("ul.mod-tabs li:first").removeClass("active");
                    currentItem = tabctrl.find("#li_" + URLanchor);
                    currentContent = tabctrl.find("#tabcontent_" + URLanchor);
                } else if (tabctrl.find(scrollLauncher).length) {
                    // the hash corresponds to a styled container inside a tabwrapper
                    var styledContainer = tabctrl.find(scrollLauncher);
                    if (styledContainer.parents("section").length) {
                        currentContent = styledContainer.parents("section");
                        currentItem = $("#li_" + currentContent[0].id.substr(11));
                    }
                }
                currentItem.addClass("active");
                if (tabctrl.find(".contentcarousel").length > 0) {
                    loadCarousel(tabctrl);
                    tabctrl.find("section.tabctrl-content").removeClass("active");
                    currentContent.addClass("active");
                    tabctrl.find("ul.mod-tabs").removeAttr("style");
                    tabctrl.find("div.mod-tabs-content").removeAttr("style");
                } else {
                    tabctrl.find("section.tabctrl-content").removeClass("active");
                    currentContent.addClass("active");
                    tabctrl.find("ul.mod-tabs").removeAttr("style");
                    tabctrl.find("div.mod-tabs-content").removeAttr("style");
                }
            } else {
                 if (tabctrl.find(".contentcarousel").length > 0) {
                    loadCarousel(tabctrl);
                    tabctrl.find("section.tabctrl-content").removeClass("active");
                    tabctrl.find("ul.mod-tabs").removeAttr("style");
                    tabctrl.find("div.mod-tabs-content").removeAttr("style");
                } else {
                    tabctrl.find("section.tabctrl-content").removeClass("active");
                    tabctrl.find("ul.mod-tabs").removeAttr("style");
                    tabctrl.find("div.mod-tabs-content").removeAttr("style");
                }
            }
        });
    });
});
jQuery(function ($) {  
    $(document).ready(function() {   	
    	
        $(".tabctrl").each(function () {
            // Tabs
            var tabctrl = $(this);
            
            // Called when clicking on a tab link
            function switchTab() {
                var link = $(this),
                    newItem = link.closest("li"),
                    oldItem = tabctrl.find(".mod-tabs li.active"),
                    newContent = tabctrl.find(link.attr("href")),
                    oldContent = tabctrl.find(".tabctrl-content:visible");
    
                if (!newItem.is(oldItem)) {
                    oldItem.removeClass("active");
                    newItem.addClass("active");
                    location.hash = newItem.attr('id').substr(3).replace(/tab$/,'');    // make the visible URL have an anchor in case people cut/paste URL
                }
                
                oldContent.removeClass("active");
                newContent.addClass("active");

                // if collapse/expand
                if ($(this).parents('.tabctrl').find('.tabctrl-collapse-wrapper').length > 0) {
                    var collapser = $(this).parents('.tabctrl').find('.tabctrl-collapse-wrapper');
                    if (collapser.hasClass('is-collapsed')) {
                        collapser.removeClass('is-collapsed');
                        tabctrl.find(".mod-tabs-content").css("height", "auto");   
                        tabctrl.find(".mod-tabs-content").height(tabctrl.find(".tabctrl-content:visible").height());
                    } 
                }

               return false;
            }
            function switchTabByHash(link) {
                var newItem = link.closest("li"),
                    oldItem = tabctrl.find(".mod-tabs li.active"),
                    newContent = tabctrl.find(link.attr("href")),
                    oldContent = tabctrl.find(".tabctrl-content:visible"),
                    collapser = link.parents('.tabctrl').find('.tabctrl-collapse-wrapper'),
                    switchtab = true;

                if (collapser.length > 0) {
                    if (collapser.hasClass('is-collapsed')) {
                        switchtab = false;
                    }
                }
                if (switchtab == true) {
                    if (!newItem.is(oldItem)) {
                        oldItem.removeClass("active");
                        newItem.addClass("active");
                    }
                    oldContent.removeClass("active");
                    newContent.addClass("active");
                }
            }
            function loadCarousel(tabctrl) {
                tabctrl.find(".carouselwrapper").each(function () {
                	$(this).removeAttr("style");
                    var carouselID = $(this).attr("id");
                    CarouselLoader["createSwipe_" + carouselID]();
                    if (tabctrl.find(".nav-buttons").length > 0) {
                        CarouselLoader["initPrevNext_" + carouselID]();
                    }
                });
            }
    
            // Initialization 
            //    mod-tabs is the li of tab names
            //    tabctrl-content is the div containing all sections - one section per tab
            tabctrl.find(".mod-tabs a").bind("click.tabctrl", switchTab);    // bind switchTab function to clicking on tabctrl
        	
            $(window).on('hashchange', function() {
                var hash, pos, a;
                hash = window.location.hash;
                pos = hash.indexOf('#m=');
                if (pos == -1) {
                    if (hash !== '') {
                        a = tabctrl.find(".mod-tabs a[href='" + hash + "tab']").last();
                    } else {
                        a = tabctrl.find(".mod-tabs a").first();
                    }
                    if (a.length == 1) {
                        switchTabByHash(a);
                    }
                }
            });
            
            var currentItem = tabctrl.find(".mod-tabs li:first");
            var currentContent = tabctrl.find(".tabctrl-content:eq(0)");
            var collapsible = false;
            if (tabctrl.find(".tabctrl-collapse-wrapper").length > 0) {
                // collapse/expand class
                tabctrl.find('.collapse-close').click(function() {
                    $(this).parents('.tabctrl-collapse-wrapper').addClass('is-collapsed');
                    tabctrl.find(".tabctrl-content").removeClass("active");
                    tabctrl.find(".mod-tabs li.active").removeClass("active");
                });
                collapsible = true;
            }
                    
            if (collapsible == false) {                                          // collapse/expand class NOT found
                var URLanchor = window.location.hash.substring(1).toLowerCase() + "tab"; // find anchor passed in on URL?
                if (URLanchor !== "" && URLanchor !== "tab" && jQuery("#"+URLanchor).length) {
                    tabctrl.find(".mod-tabs li:first").removeClass("active");    // just in case first tab isn't the anchor, make sure it isn't active
                    currentItem = tabctrl.find("#li_"+URLanchor);                // find li item with id="li_xxx" where xxx is input URLanchor
                    currentContent = tabctrl.find("#"+URLanchor);
                } else if(jQuery(window.location.hash.toLowerCase() + "scroll").length) {
                	// styled containers can be nested inside of tabs.
                    var styledContainer = jQuery(window.location.hash.toLowerCase() + "scroll".toLowerCase());
                    //if the hash+scroll is a valid dom element, then find out if there is a ancestor with suffix "tab"
                    if(styledContainer.parents("section[id$='tab']").length) {
                    	currentContent = styledContainer.parents("section[id$='tab']");  
                    	currentItem = jQuery("#li_" + currentContent[0].id);
                	}                                        
                }
                
                currentItem.addClass("active");   // set active tab so css styling to show active tab applied
                
                if (tabctrl.find(".contentcarousel").length > 0) {
                    loadCarousel(tabctrl);
                    tabctrl.find(".tabctrl-content").removeClass("active");
                    currentContent.addClass("active");
                    tabctrl.find(".mod-tabs").removeAttr("style");
                    tabctrl.find(".mod-tabs-content").removeAttr("style");
                } else {
                    tabctrl.find(".tabctrl-content").removeClass("active");
                    currentContent.addClass("active");
                    tabctrl.find(".mod-tabs").removeAttr("style");
                    tabctrl.find(".mod-tabs-content").removeAttr("style");
                }
            } else {
                 if (tabctrl.find(".contentcarousel").length > 0) {
                    loadCarousel(tabctrl);
                    tabctrl.find(".tabctrl-content").removeClass("active");
                    tabctrl.find(".mod-tabs").removeAttr("style");
                    tabctrl.find(".mod-tabs-content").removeAttr("style");
                   
                } else {
                    tabctrl.find(".tabctrl-content").removeClass("active");
                    tabctrl.find(".mod-tabs").removeAttr("style");
                    tabctrl.find(".mod-tabs-content").removeAttr("style");
                }
            }
        });
    });
});
jQuery( document ).ready( function($) {
Object.keys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
        DontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        DontEnumsLength = DontEnums.length;
  
    return function (o) {
        if (typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");
     
        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }
     
        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }  
        }
     
        return result;
    };
})();   

});
jQuery(document).ajaxStop( function () {
	jQuery("ul.listOfItems").each(function(idx, group) {
		var groupLimit = jQuery(group).data('groupLimit');
		if (groupLimit > 0) {
			if (jQuery(group).find('li.listItem:visible').length > groupLimit) {
				jQuery(group).find('li.listItem:visible').slice(groupLimit).css({display : 'none'});
			}
		}
	});
});

jQuery( document ).ready( function($) {
	
	var menufilterhash = "";
	if (window.location.hash && (window.location.hash.indexOf("#filterlist=") > -1)) {
		// Trim off #filterlist= (first 12 chars) and then
		// allow just a-z, A-Z, 0-9, underscore and dash
		menufilterhash = window.location.hash.slice(12).replace(/[^a-z0-9_-]/gi,'');
	}

	$("ul.listOfItems").each(function(idx, group) {
		var jgroup = $(group);
		var groupLimit = jgroup.data('groupLimit');
		var visibleItems = jgroup.find('li.listItem:visible');
		if (groupLimit > 0) {
			if (visibleItems.length > groupLimit) {
				visibleItems.slice(groupLimit).css({display : 'none'});
			}
		}
	});

	$(".listgroup").each(function () {
		// List Group to apply Filters to
		var listgroup = $(this);
		var filterDropDowns = {
				"filterSelection1" : "",
				"filterSelection2" : "",
				"filterSelection3" : ""
		};
		var $container = null;

		// when this is driven, the user has clicked on one of the filter dropdowns.
		function filterDisplayedItems() {
			// remember the filter selections in global variable hashmap
			for (var i = 0, keys = Object.keys(listgroup.filterDropDowns), ii = keys.length; i < ii; i++) {
				if ($(this).parent().hasClass( keys[i] )) {
					listgroup.filterDropDowns[keys[i]] = $(this).attr('data-tagvalue');
					$(this).siblings('li').removeClass("selected");
					$(this).addClass("selected");
					window.location.hash = "filterlist=" + $(this).attr('data-tagvalue');
				}
			}

			// display all list items and then loop through and hide those items in the display that don't meet the filter criteria
			listgroup.find("ul.listOfItems li").removeAttr('style');
			if (listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
				listgroup.find("ul.listOfItems li.listItem").addClass('brick');
			}
			for (i = 0, keys = Object.keys(listgroup.filterDropDowns), ii = keys.length; i < ii; i++) {
				filterItemsOnInputFilter(listgroup.filterDropDowns[keys[i]]);
			}

			// if Group By used - hide group labels with no items displayed underneath
			var groups = listgroup.find("span.list-group");
			if (groups.length > 1) {
				hideGroupHeadings(groups);
			}

			// Ensure no filter dropdowns contain entries for which there is no matching content
			filterFilters();

			//hide extra values from longer lists
			hideSurplusGroupMembers(listgroup);

			if (listgroup.find("ul.listOfItems").hasClass("list-bricks") && $container) {
				$container.imagesLoaded( function() {
					$container.masonry('destroy');
					$container.masonry({
						itemSelector: '.brick'
					});
				});
			}

			// the user has made a selection - close the dropdown
			if (jQuery(this).parent('ul').hasClass('is-open')){
				jQuery(this).parent('ul').toggleClass('is-open');
			}

		}

		// Hide items that don't contain input tag filter.  If no input tag filter, hide items in filter itself that aren't in remaining items.
		function filterItemsOnInputFilter(filter) {
			if (filter && filter !== "") {
				listgroup.find("ul.listOfItems li.listItem:not(." + filter +")").css({display : 'none'});
				if (listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
					listgroup.find("ul.listOfItems li.listItem:not(." + filter +")").removeClass('brick');
				}
			}
		}

		// if Group By used - hide group labels with no items being displayed underneath after filtering
		function hideGroupHeadings(groups) {
			groups.each(function(idx, group) {
				if ($(group).siblings('ul').find('li.listItem:visible').length > 0) {
					$(group).removeAttr('style');
					$(group).parent().next('span.div-shadow').removeAttr('style');
				}
				else {
					$(group).css({display : 'none'});
					$(group).parent().next('span.div-shadow').css({display : 'none'});
				}
			});
		}

		//if length of group specified - hide additional items if group is too long
		function hideSurplusGroupMembers(listgroup) {
			listgroup.find("ul.listOfItems").each(function(idx, group) {
				var groupLimit = $(group).data('groupLimit');
				var visibleItems = $(group).find('li.listItem:visible');
				if (groupLimit > 0) {
					if (visibleItems.length > groupLimit) {
						visibleItems.slice(groupLimit).css({display : 'none'});
						if (listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
							listgroup.find("ul.listOfItems li.listItem:not(." + filter +")").removeClass('brick');
						}
					}
				}
			});
		}

		// populate unselected filters based on selected filters and the list of items itself - eliminate filter selections that would result in no items displayed
		function filterFilters() {
			for (var i = 0, keys = Object.keys(listgroup.filterDropDowns), ii = keys.length; i < ii; i++) {
				dropdownToProcess = listgroup.find("ul." + keys[i]);
				if (dropdownToProcess.length) {
					if (listgroup.filterDropDowns[keys[i]] === "") {
						filterTags(dropdownToProcess);
					}
				}
			}
		}

		// Hide tags that don't have content in the list items currently displayed
		function filterTags( dropdownToProcess ) {
			var tagDropDownLiItems = dropdownToProcess.find("li");
			tagDropDownLiItems.removeAttr('style');

			var numtagsdisplayed = 1;
			tagDropDownLiItems.each(function(idx, tagDropDownLi) {
				// is this tagDropDownOption (e.g. "industry1150") in the data-value= parm of at least one listItem's li element?
				var dropDownValue = $(tagDropDownLi).attr('data-tagvalue');
				if (dropDownValue !== "") {
					var itemsWithThisTag = listgroup.find("ul.listOfItems li." + dropDownValue + ":visible"); // search only list items that are currently shown for items with the input tag
					if (itemsWithThisTag.length) {  // keep this tag value
						++numtagsdisplayed;
					}  
					else {                          // remove this tag value
						$(tagDropDownLi).css({display : 'none'});
					}
				}
			});

			// if only "All" selection is visible in filter dropdown, style dropdown as inactive
			if (numtagsdisplayed > 1) {
				dropdownToProcess.removeClass("inactive");
			}
			else {
				dropdownToProcess.addClass("inactive");
			}
		}

		// The list of items to display is now available.  Complete initialization
		function initializeAfterListLoaded() {
			if (listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
				listgroup.find("ul.listOfItems li.listItem").addClass("brick");
			}

			if (listgroup.find("div.filters").length) {
				listgroup.filterDropDowns = {	// as selections are made, the values here are selected values, like industry1150
						"filterSelection1" : listgroup.find("ul.filterSelection1 li.filter_li").first().attr('data-tagvalue'), 
						"filterSelection2" : listgroup.find("ul.filterSelection2 li.filter_li").first().attr('data-tagvalue'), 
						"filterSelection3" : listgroup.find("ul.filterSelection3 li.filter_li").first().attr('data-tagvalue')
				};
				// SET THE FIRST FILTER ITEM filter_li IN EACH FILTER filterSelectionN  AS SELECTED
				listgroup.find("ul.filterSelection1 li.filter_li").first().addClass("selected");
				listgroup.find("ul.filterSelection2 li.filter_li").first().addClass("selected");
				listgroup.find("ul.filterSelection3 li.filter_li").first().addClass("selected");

				filterFilters();

				// if parameters on input URL, apply them to the filter.  Example industry=industry1150
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				var findAndSelectLi = function (liItems, hash) {
					liItems.each(function(idx, liItem) {
						if ($(liItem).attr('data-tagvalue') == hash[0] + hash[1]) {
							$(liItem).siblings('li').removeClass("selected");
							$(liItem).addClass("selected");
						}
					});
				};

				for(var outer_i = 0; outer_i < hashes.length; outer_i++)
				{
					hash = hashes[outer_i].split('=');
					// <ul class="filterSelection1" data-tagcategory="industry">
					// find class of ul for which data-tagcategory = hash[0] - you are trying to figure out which dropdown this is for

					for (var i = 0, keys = Object.keys(listgroup.filterDropDowns), ii = keys.length; i < ii; i++) {
						if (hash[0] == listgroup.find("ul." + keys[i]).attr('data-tagcategory')) {
							listgroup.filterDropDowns[keys[i]] = hash[0] + hash[1];
							// find li under current ul that has value of hash[1] for attribute 'data-tagcategory' and addClass "selected"
							var liItems = listgroup.find("ul." + keys[i] + " li");
							findAndSelectLi(liItems, hash);
						}
					}
				}

				filterDisplayedItems();


				// Bind click on value in drop down to filterDisplayedItems function
				listgroup.find("li.filter_li").on("click",filterDisplayedItems);

				// On click of any dropdown, enable toggling of drop down list to simulate expand/collapse
				listgroup.find('button.filter-toggle').click(function(){
					var ulOfSelectedButton = $(this).siblings('ul').attr('class');
					var ulDropDowns = listgroup.find('button.filter-toggle').siblings('ul');
					ulDropDowns.each(function(idx, ulDropDown) {
						if (ulOfSelectedButton != ulDropDown.className) {
							$(ulDropDown).removeClass('is-open');
						}
					});
					jQuery(this).siblings('ul').toggleClass('is-open');
				});
				
				// Handle the listgroup when #filterlist= is
				// in the hash when the page is loaded
				if (menufilterhash !== "") {
					$('li.filter_li[data-tagvalue="' + menufilterhash + '"]').each(filterDisplayedItems);
				}
			}

			if (listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
				$container = listgroup.find("ul.listOfItems");

				$container.imagesLoaded( function() {
					$container.masonry({
						itemSelector: '.brick',
						isResizable: 'true'
					});
					$container.addClass("loaded");
				});
			}
		}

		// Initialization
		if (listgroup.find("div.syncmode").hasClass("sync")) {
			// synchronous
			if (listgroup.find("div.filters").length || listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
				initializeAfterListLoaded();
			}
		}
		else {
			// asynchronous
			listgroup.on( "listloaded", function() {
				// custom event "listloaded" triggered in asynclistload.js
				if (listgroup.find("div.filters").length || listgroup.find("ul.listOfItems").hasClass("list-bricks")) {
					initializeAfterListLoaded();
				}
			});
		}
	});

});
jQuery(function ($) {

$( document ).ready( function($) {
    var store = CQ_Analytics.ClientContextMgr.getRegisteredStore("locstore");
    
    $(".conditionalcontainer").each(function () {
        var conditionalcontainer = $(this);
        
        // Called after Client Context initialized
        function showHideContainer() {
            var container = conditionalcontainer.find("div.container");
            var compareCountry = container.attr("data-condition");
            if (compareCountry !== "" && store) {
                var contextCountry = store.getProperty("address/country_code", true);    
                if ( (typeof(contextCountry) !== 'undefined') && (compareCountry.contains(contextCountry)) ) {
                    container.removeClass("is-hidden");
                }
            }  
        }
        
        // Initialization - listen for client context store's update event
        if (store) {
            // store.setProperty("address/country_code", "US");
            store.addListener("update", showHideContainer()); 
        }
    });
    
});

});
(function ($) {
	function topInViewport(element) {
    return $(element).offset().top >= $(window).scrollTop() && $(element).offset().top <= $(window).scrollTop() + $(window).height();
	}
	
	$('.animatedcontent .an-trigger-hover').each(function(){
		$(this).mouseenter(function() {
			$(this).addClass('animate');			
		});
		
	});
	
	$('.animatedcontent .an-trigger-view').each(function(){
		var pElement = $(this);
		
		$(window).on("load resize scroll",function(){
			if (topInViewport(pElement)) {
				pElement.addClass('animate');
			}
			else {
				pElement.removeClass('animate');
			}
			});
		
	});
	
})(jQuery);
var SAS = (function(SAS) {

	SAS.submitForm = function(formId) {
		var theForm = jQuery("#" + formId), formSubmissionType = theForm
				.find("input[name='formSubmissionType']"), confirmationText = theForm
				.find(".confirmationText");

		if (formSubmissionType && formSubmissionType.val() == "async") {
			jQuery.ajax({
				url : theForm.attr("action"),
				type : "POST",
				data : theForm.serialize(),
				success : function(resp) {
					theForm.replaceWith(confirmationText.html());
					try {
						handlePostAsyncFormSubmit();
					} catch(methodDoesNotExist) {
						console.log("post async handler method does not exist for the current design");
					}
					return false;
				},
				error : function(error) {
					console.log(error.statusText + " " + error.responseText);
					return false;
				}
			});
			return false;
		} else {
			theForm.submit();
		}
	};

	return SAS;
}(SAS || {}));
