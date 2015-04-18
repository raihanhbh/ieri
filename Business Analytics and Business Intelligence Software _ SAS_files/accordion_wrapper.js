jQuery(function ($) {
	
	$('.accordion-title').click(function() {
		$(this).parent('div').siblings('.accordion.parbase.section').children('.accordion-content.is-open').removeClass('is-open');
		if($(this).parent('div').children('.accordion-content').hasClass('is-open'))
			$(this).parent('div').children('.accordion-content').removeClass('is-open');
		else if(!$(this).parent('div').children('.accordion-content').hasClass('is-close'))
			$(this).parent('div').children('.accordion-content').addClass('is-open');

		$(this).parent('div').siblings('.accordion.parbase.section').children('.accordion-title.is-active').removeClass('is-active');
		if($(this).hasClass('is-active'))
			$(this).removeClass('is-active');
		else if(!$(this).hasClass('is-active'))
			$(this).addClass('is-active');
	});
	$('.accordionbuttonexpand').click(function() {
		$(this).siblings('.accordionWrapperParsys').children().children('.accordion.parbase.section').children('.accordion-content').addClass('is-open');
		$(this).siblings('.accordionWrapperParsys').children().children('.accordion.parbase.section').children('.accordion-title').addClass('is-active');
	});
	$('.accordionbuttoncompress').click(function() {
		$(this).siblings('.accordionWrapperParsys').children().children('.accordion.parbase.section').children('.accordion-content').removeClass('is-open');
		$(this).siblings('.accordionWrapperParsys').children().children('.accordion.parbase.section').children('.accordion-title').removeClass('is-active');
	});
});

