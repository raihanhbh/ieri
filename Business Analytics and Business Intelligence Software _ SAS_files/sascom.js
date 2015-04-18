jQuery( document ).ready( function() {
	jQuery('#feedback-button').click(function() {
		_uzactfeed.push(['_launch', { m: true } ]);
	jQuery('#uz_popup_modal').prepend('<button id="close-uz-modal"></button>');
	jQuery('#close-uz-modal, #uz_bg').click(function() {
		jQuery('#uz_popup_container').remove();
	});
	});
});
jQuery( document ).ready( function() {

    var listsToLoad = jQuery("a.async-list");
    var deferreds = [];

    jQuery.each(listsToLoad, function(i, element) {
        var listRequest = jQuery.ajax({
            url: jQuery(this).attr("href"),
            type: "GET",
            dataType: "html"
        });
        listRequest.done(function( msg ) {
            jQuery(element).replaceWith(msg);
        });
        listRequest.fail(function( jqXHR, textStatus ) {
            jQuery(element).replaceWith("");
            console.log("Request failed: " + textStatus );
        }
        );
        deferreds.push(listRequest);
    });	

    var switchTab = function(tabId) {
        var switchingToTab = jQuery("#li_" + currentContent[0].id);
        var switchingToSection = jQuery("section.#"+currentContent[0].id);

        var parentTabControl = switchingToTab.parents(".tabctrl");
        var oldItem = parentTabControl.find(".mod-tabs li.active");
        oldItem.removeClass("active");
        var oldContent = switchingToTab.find(".tabctrl-content:visible");
        oldContent.removeClass("active");

        switchingToTab.addClass("active");
        var newContent = parentTabControl.find(switchingToTab.first().attr("href"));
        newContent.addClass("active");
        switchingToSection.addClass("active");
    };
    
    var scrollToHash = function() {
        var loc = decodeURIComponent(window.location.hash) + 'scroll';
        var scrollToInsideTab = jQuery(loc.toLowerCase());

        //if the hash+scroll is a valid dom element, then find out if there is a ancestor with suffix "tab"
        if(scrollToInsideTab.parents("section[id$='tab']").length) {
            currentContent = scrollToInsideTab.parents("section[id$='tab']");
            switchTab(currentContent[0].id);
        }

        setTimeout(
            function() {
                if (jQuery(loc).length > 0) {
                    var scrollOffset = jQuery(loc).offset().top - 50;
                    jQuery("html, body").animate({scrollTop: scrollOffset}, 1000, 'swing');
                }
            },300);

        jQuery(".listgroup").trigger( "listloaded" );    // trigger custom event that list is loaded
    };

    var scrollToListGroup = function(anchorTag) {
        var $this = anchorTag;

        if (jQuery($this).parents('.subtabs').length){
            //do nothing
        } else {
            if (location.pathname.replace(/^\//,'') == $this.pathname.replace(/^\//,'') && location.hostname == $this.hostname) {
                var target = jQuery($this).attr('href') + 'scroll';
                try {
                    if (target.length) {
                        var scrollOffset;
                        if (jQuery('.header.fixed').length) {
                            scrollOffset = jQuery(target).offset().top;
                        } else {
                            scrollOffset = jQuery(target).offset().top - 150;
                        }
                        jQuery("html, body").animate({scrollTop: scrollOffset}, 1000, 'swing');
                    }
                } catch(e) {
                    console.log(e.message);
                }
            }
        }
    };

    var executeScrollToHash = function(){
        if (typeof jmpDesign != "undefined" && typeof jmpDesign.scrollToHash =="function"){
            jmpDesign.scrollToHash();
        }else if(typeof pblsDesign != "undefined" && typeof pblsDesign.scrollToHash =="function"){
            pblsDesign.scrollToHash();
        } else if(typeof saswwwDesign != "undefined" && typeof saswwwDesign.scrollToHash == "function"){
            saswwwDesign.scrollToHash();
        } else if (typeof sascampaignsDesign != "undefined" && typeof sascampaignsDesign.scrollToHash == "function"){
            sascampaignsDesign.scrollToHash();
        } else {
            scrollToHash();
        }
    };

    var executeScrollToListGroup = function(){
        if (typeof jmpDesign != "undefined" && typeof jmpDesign.scrollToListGroup =="function"){
            jmpDesign.scrollToListGroup(this);
        }else if(typeof pblsDesign != "undefined" && typeof pblsDesign.scrollToListGroup =="function"){
            pblsDesign.scrollToListGroup(this);
        } else if(typeof saswwwDesign != "undefined" && typeof saswwwDesign.scrollToListGroup == "function"){
            saswwwDesign.scrollToListGroup(this);
        } else if (typeof sascampaignsDesign != "undefined" && typeof sascampaignsDesign.scrollToListGroup == "function"){
            sascampaignsDesign.scrollToListGroup(this);
        } else {
            scrollToListGroup(this);
        }
    };


    var expandCollapseDescription = function() {
        jQuery(this).toggleClass('show');
        jQuery(this).next('span.abstract').toggleClass('show');
        return false;
    };

    jQuery(".listgroup").on("click","a[href*=#]:not([href=#])", executeScrollToListGroup);
    jQuery("body").on("click","a[href*=#]:not([href=#])", executeScrollToListGroup);
    jQuery(".listgroup").on("click","button.abstract-toggle", expandCollapseDescription);
    jQuery(".assetlist").on("click","button.abstract-toggle", expandCollapseDescription);

    if(listsToLoad && listsToLoad.length === 0) {
        executeScrollToHash();
    } else {
        //after all of the ajax requests, scroll to hash
        jQuery.when.apply(null, deferreds).then(function() { executeScrollToHash(); });
    }
});
