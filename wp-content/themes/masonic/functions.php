<?php
/**
 * Masonic functions and definitions
 *
 * @package ThemeGrill
 * @subpackage Masonic
 * @since 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if (!isset($content_width)) {
    $content_width = 600; /* pixels */
}

if (!function_exists('masonic_setup')) :

    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function masonic_setup()
    {

        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on masonic, use a find and replace
         * to change 'masonic' to the name of your theme in all the template files
         */
        load_theme_textdomain('masonic', get_template_directory() . '/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
         */
        add_theme_support('post-thumbnails');
        add_image_size('small-thumb', 350, 205, true);
        add_image_size('large-thumb', 570, 255, true);

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(array(
            'primary' => __('Primary Menu', 'masonic'),
        ));

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support('html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
        ));

        // Set up the WordPress core custom background feature.
        add_theme_support('custom-background', apply_filters('masonic_custom_background_args', array(
            'default-color' => 'ffffff',
            'default-image' => '',
        )));
    }

endif; // masonic_setup
add_action('after_setup_theme', 'masonic_setup');

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function masonic_widgets_init()
{
    register_sidebar(array(
        'name' => __('Right Sidebar', 'masonic'),
        'id' => 'right-sidebar',
        'description' => '',
        'before_widget' => '<aside id="%1$s" class="blog-post widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<div class="widget-title"><h3>',
        'after_title' => '</h3></div>',
    ));
    register_sidebar(array(
        'name' => __('Footer Sidebar One', 'masonic'),
        'id' => 'footer-sidebar-one',
        'description' => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<div class="widget-title"><h3>',
        'after_title' => '</h3></div>',
    ));
    register_sidebar(array(
        'name' => __('Footer Sidebar Two', 'masonic'),
        'id' => 'footer-sidebar-two',
        'description' => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<div class="widget-title"><h3>',
        'after_title' => '</h3></div>',
    ));
    register_sidebar(array(
        'name' => __('Footer Sidebar Three', 'masonic'),
        'id' => 'footer-sidebar-three',
        'description' => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<div class="widget-title"><h3>',
        'after_title' => '</h3></div>',
    ));
}

add_action('widgets_init', 'masonic_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function masonic_scripts()
{
    wp_enqueue_style('masonic-style', get_stylesheet_uri());

    wp_enqueue_style('masonic-google-fonts', '//fonts.googleapis.com/css?family=Open+Sans:400,300italic,700');

    wp_enqueue_style('masonic-font-awesome', get_template_directory_uri() . '/font-awesome/css/font-awesome.min.css');

    if (is_front_page() || is_archive() || is_home()) {
        wp_enqueue_script('masonic-setting', get_template_directory_uri() . '/js/masonry-setting.js', array('jquery-masonry', 'jquery'), '20150106', true);
    }

    wp_enqueue_script('masonic-search-toggle', get_template_directory_uri() . '/js/search-toggle.js', array('jquery'), '20150106', true);

    wp_enqueue_script('masonic-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('wp_enqueue_scripts', 'masonic_scripts');

/**
 * Sets the post excerpt length to 40 words.
 *
 * function tied to the excerpt_length filter hook.
 *
 * @uses filter excerpt_length
 */
function masonic_excerpt_length($length)
{
    return 40;
}

add_filter('excerpt_length', 'masonic_excerpt_length');

/**
 * Returns a "Continue Reading" link for excerpts
 */
function masonic_read_more($more)
{
    return '';
}

add_filter('excerpt_more', 'masonic_read_more');

/**
 * function to show the footer info, copyright information
 */
if (!function_exists('masonic_footer_copyright')) :

    function masonic_footer_copyright()
    {
        $wp_link = '<a href="' . 'http://wordpress.org' . '" target="_blank" title="' . esc_attr__('WordPress', 'masonic') . '"><span>' . __('WordPress', 'masonic') . '</span></a>';

        $tg_link = '<a href="' . 'http://themegrill.com/themes/masonic' . '" target="_blank" title="' . esc_attr__('ThemeGrill', 'masonic') . '" rel="author"><span>' . __('ThemeGrill', 'masonic') . '</span></a>';

        $default_footer_value = sprintf(__('Powered by %s', 'masonic'), $wp_link) . ' <br> ' . sprintf(__('Theme: %2$s by %1$s', 'masonic'), $tg_link, 'Masonic');

        $masonic_footer_copyright = $default_footer_value;
        echo $masonic_footer_copyright;
    }

endif;
add_action('masonic_footer_copyright', 'masonic_footer_copyright', 10);

// Adding the ID and CLASS attributes to the first <ul> occurence in wp_page_menu for supporting the default menu
function masonic_add_menuclass($ul)
{
    return preg_replace('/<ul>/', '<ul id="menu" class="menu wrapper">', $ul);
}

add_filter('wp_page_menu', 'masonic_add_menuclass');

// Adding the support for the entry-title tag for Google Rich Snippets
function masonic_add_mod_hatom_data($content)
{
    $title = get_the_title();
    if (is_single()) {
        $content .= '<div class="extra-hatom-entry-title"><span class="entry-title">' . $title . '</span></div>';
    }
    return $content;
}

add_filter('the_content', 'masonic_add_mod_hatom_data');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';