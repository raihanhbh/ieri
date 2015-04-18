/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

jQuery(document).ready(function () {

    jQuery('#menu-toggle').on('click', function () {
        if (jQuery('#utility-nav').hasClass('is-active')) {
            jQuery('#utility-nav').removeClass('is-active');
        } else {
            jQuery('#utility-nav').addClass('is-active');
        }
    });

    jQuery('#main-menu-toggle').on('click', function () {
        if (jQuery('#nav-main').hasClass('is-active')) {
            jQuery('#nav-main').removeClass('is-active');
        } else {
            jQuery('#nav-main').addClass('is-active');
        }
    });
});

(function ($) {
    // Site title and description.
    wp.customize('blogname', function (value) {
        value.bind(function (to) {
            $('.site-title a').text(to);
        });
    });
    wp.customize('blogdescription', function (value) {
        value.bind(function (to) {
            $('.site-description').text(to);
        });
    });
    // Header text color.
    wp.customize('header_textcolor', function (value) {
        value.bind(function (to) {
            if ('blank' === to) {
                $('.site-title, .site-description').css({
                    'clip': 'rect(1px, 1px, 1px, 1px)',
                    'position': 'absolute'
                });
            } else {
                $('.site-title, .site-description').css({
                    'clip': 'auto',
                    'color': to,
                    'position': 'relative'
                });
            }
        });
    });


})(jQuery);


