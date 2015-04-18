<?php
/**
 * Masonic Theme Customizer
 *
 * @package ThemeGrill
 * @subpackage Masonic
 * @since 1.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function masonic_customize_register($wp_customize)
{
    $wp_customize->get_setting('blogname')->transport = 'postMessage';
    $wp_customize->get_setting('blogdescription')->transport = 'postMessage';
    $wp_customize->get_setting('header_textcolor')->transport = 'postMessage';
}

add_action('customize_register', 'masonic_customize_register');

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function masonic_customize_preview_js()
{
    wp_enqueue_script('masonic_customizer', get_template_directory_uri() . '/js/customizer.js', array('customize-preview'), '20130508', true);
}

add_action('customize_preview_init', 'masonic_customize_preview_js');

function masonic_register_theme_customizer($wp_customize)
{

    class MASONIC_ADDITIONAL_Control extends WP_Customize_Control
    {

        public $type = 'textarea';

        public function render_content()
        {
            ?>
            <label>
                <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
                <textarea rows="5"
                          style="width:100%;" <?php $this->link(); ?>><?php echo esc_textarea($this->value()); ?></textarea>
            </label>
        <?php
        }

    }

    // masonic color options
    $masonic_colors = array('masonic_primary_color' => array(
        'id' => 'masonic_primary_color',
        'default' => '#ffc800',
        'title' => __('Primary Color', 'masonic')
    ),
        'masonic_link_color' => array(
            'id' => 'masonic_link_color',
            'default' => '#6a6a6a',
            'title' => __('Link Color', 'masonic')
        ));

    $i = 20;
    foreach ($masonic_colors as $masonic_color) {
        $wp_customize->add_setting(
            $masonic_color['id'], array(
                'default' => $masonic_color['default'],
                'capability' => 'edit_theme_options',
                'sanitize_callback' => 'masonic_sanitize_hex_color',
                'sanitize_js_callback' => 'masonic_sanitize_escaping'
            )
        );
        $wp_customize->add_control(
            new WP_Customize_Color_Control(
                $wp_customize, $masonic_color['id'], array(
                    'label' => $masonic_color['title'],
                    'section' => 'colors',
                    'settings' => $masonic_color['id'],
                    'priority' => $i
                )
            )
        );
        $i++;
    }

    // masonic logo options
    $wp_customize->add_section('masonic_logo_section', array(
        'title' => __('Logo', 'masonic'),
        'priority' => 10,
        'description' => 'Upload Your Logo Here',
    ));

    $wp_customize->add_setting('masonic_logo', array
    ('default' => '',
        'capability' => 'edit_theme_options',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'masonic_logo', array(
        'label' => __('Logo', 'masonic'),
        'section' => 'masonic_logo_section',
        'settings' => 'masonic_logo',
    )));

    // masonic custom css options
    $wp_customize->add_section(
        'masonic_custom_css_section', array(
            'title' => __('Custom CSS', 'masonic'),
            'priority' => 200
        )
    );

    $wp_customize->add_setting(
        'masonic_custom_css', array(
            'default' => '',
            'capability' => 'edit_theme_options',
            'sanitize_callback' => 'wp_filter_nohtml_kses',
            'sanitize_js_callback' => 'wp_filter_nohtml_kses'
        )
    );

    $wp_customize->add_control(
        new MASONIC_ADDITIONAL_Control(
            $wp_customize, 'masonic_custom_css', array(
                'label' => __('Add your custom css here and design live! (for advanced users)', 'masonic'),
                'section' => 'masonic_custom_css_section',
                'settings' => 'masonic_custom_css'
            )
        )
    );

    function masonic_sanitize_hex_color($color)
    {
        if ($unhashed = sanitize_hex_color_no_hash($color))
            return '#' . $unhashed;

        return $color;
    }

    function masonic_sanitize_escaping($input)
    {
        $input = esc_attr($input);
        return $input;
    }

}

add_action('customize_register', 'masonic_register_theme_customizer');

function masonic_customizer_css()
{
    $customizer_css = '';
    $primary_color = get_theme_mod('masonic_primary_color', '#ffc800');
    $link_color = get_theme_mod('masonic_link_color', '#6a6a6a');
    if ($primary_color && $primary_color != '#ffc800') {
        $customizer_css .= '
	     blockquote { border-left: 2px solid ' . $primary_color . '; }
           .post-header .entry-author, .post-header .entry-standard, .post-header .entry-date, .post-header .entry-tag { color: ' . $primary_color . '; }
           .entry-author, .entry-standard, .entry-date { color: ' . $primary_color . '; }
           a:hover { color: ' . $primary_color . '; }
           .widget_recent_entries li:before, .widget_recent_comments li:before { color: ' . $primary_color . '; }
           .underline { background: none repeat scroll 0 0 ' . $primary_color . '; }
           .widget-title { border-left: 3px solid ' . $primary_color . '; }
           .sticky { border: 1px solid ' . $primary_color . '; }
           .footer-background { border-top: 5px solid ' . $primary_color . '; }
           .site-title a:hover { color: ' . $primary_color . '; }
           button, input[type="button"], input[type="reset"], input[type="submit"] { background: none repeat scroll 0 0 ' . $primary_color . '; }
           .breadcrums span { color: ' . $primary_color . '; }
           .button:hover { color: ' . $primary_color . '; }
           .catagory-type a:hover { color: ' . $primary_color . '; }
           .copyright a span { color: ' . $primary_color . '; }
           button:hover, input[type="button"]:hover, input[type="reset"]:hover, input[type="submit"]:hover { color: ' . $primary_color . '; }
           .widget_rss li a:hover { color: ' . $primary_color . '; }
           @media screen and (max-width: 768px) { nav li:hover ul li a:hover, nav li a:hover { background: ' . $primary_color . '; } }
           ';
    }
    if ($link_color && $link_color != '#6a6a6a') {
        $customizer_css .= '
           a { color: ' . $link_color . '; }
           .button { color: ' . $link_color . '; }
           .catagory-type a { color: ' . $link_color . '; }
           .widget_rss li a { color: ' . $link_color . '; }
           ';
    }
    ?>
    <style type="text/css"><?php echo $customizer_css; ?></style>
    <?php
    if (get_theme_mod('masonic_custom_css')) {
        $customizer_css .= get_theme_mod('masonic_custom_css');
        echo "<style type=\"text/css\">{$customizer_css}</style>";
    }
}

add_action('wp_head', 'masonic_customizer_css');