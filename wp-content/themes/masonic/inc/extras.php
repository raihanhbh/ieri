<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package ThemeGrill
 * @subpackage Masonic
 * @since 1.0
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function masonic_body_classes($classes)
{
// Adds a class of group-blog to blogs with more than 1 published author.
    if (is_multi_author()) {
        $classes[] = 'group-blog';
    }

    return $classes;
}

add_filter('body_class', 'masonic_body_classes');

if (version_compare($GLOBALS['wp_version'], '4.1', '<')) :

    /**
     * Filters wp_title to print a neat <title> tag based on what is being viewed.
     *
     * @param string $title Default title text for current view.
     * @param string $sep Optional separator.
     * @return string The filtered title.
     */
    function masonic_wp_title($title, $sep)
    {
        if (is_feed()) {
            return $title;
        }

        global $page, $paged;

        // Add the blog name
        $title .= get_bloginfo('name', 'display');

        // Add the blog description for the home/front page.
        $site_description = get_bloginfo('description', 'display');
        if ($site_description && (is_home() || is_front_page())) {
            $title .= " $sep $site_description";
        }

        // Add a page number if necessary:
        if (($paged >= 2 || $page >= 2) && !is_404()) {
            $title .= " $sep " . sprintf(__('Page %s', 'masonic'), max($paged, $page));
        }

        return $title;
    }

    add_filter('wp_title', 'masonic_wp_title', 10, 2);

    /**
     * Title shim for sites older than WordPress 4.1.
     *
     * @link https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
     * @todo Remove this function when WordPress 4.3 is released.
     */
    function masonic_render_title()
    {
        ?>
        <title><?php wp_title('|', true, 'right'); ?></title>
    <?php
    }

    add_action('wp_head', 'masonic_render_title');
endif;

function masonic_author_links()
{
    $author_firstname = get_the_author_meta('first_name');

    $author_twitter = get_the_author_meta('twitter');
    $author_googleplus = get_the_author_meta('googleplus');
    $author_facebook = get_the_author_meta('facebook');
    if ($author_twitter || $author_googleplus || $author_facebook) {
        echo '<ul><li>';
    }
    if ($author_twitter) {
        echo '<a class="author-links" href="https://twitter.com/' . esc_attr($author_twitter) . '" title="' . sprintf(__('Follow %s on Twitter', 'masonic'), $author_firstname) . '"  target="_blank"><i class="fa fa-twitter"></i></a>';
    }
    if ($author_googleplus) {
        echo '<a class="author-links" href="' . esc_url($author_googleplus) . '" title="' . sprintf(__('Follow %s on Google+', 'masonic'), $author_firstname) . '"  rel="author" target="_blank"><i class="fa fa-google-plus"></i></a>';
    }
    if ($author_facebook) {
        echo '<a class="author-links" href="' . esc_url($author_facebook) . '" title="' . sprintf(__('Follow %s on Facebook', 'masonic'), $author_firstname) . '"  target="_blank"><i class="fa fa-facebook"></i></a>';
    }
    echo '</li></ul>';
}

if (!function_exists('masonic_header_title')) :

    /**
     * Show the title in header
     */
    function masonic_header_title()
    {
        if (is_archive()) {
            if (is_category()) :
                $masonic_header_title = single_cat_title('Category: ', FALSE);

            elseif (is_tag()) :
                $masonic_header_title = single_tag_title('Tag: ', FALSE);

            elseif (is_author()) :
                /* Queue the first post, that way we know
                 * what author we're dealing with (if that is the case).
                 */
                the_post();
                $masonic_header_title = sprintf(__('Author: %s', 'masonic'), '<span class="vcard">' . get_the_author() . '</span>');
                /* Since we called the_post() above, we need to
                 * rewind the loop back to the beginning that way
                 * we can run the loop properly, in full.
                 */
                rewind_posts();

            elseif (is_day()) :
                $masonic_header_title = sprintf(__('Day: %s', 'masonic'), '<span>' . get_the_date() . '</span>');

            elseif (is_month()) :
                $masonic_header_title = sprintf(__('Month: %s', 'masonic'), '<span>' . get_the_date('F Y') . '</span>');

            elseif (is_year()) :
                $masonic_header_title = sprintf(__('Year: %s', 'masonic'), '<span>' . get_the_date('Y') . '</span>');

            else :
                $masonic_header_title = __('Archives', 'masonic');

            endif;
        } elseif (is_404()) {
            $masonic_header_title = __('404: Page Not Found', 'masonic');
        } elseif (is_search()) {
            $masonic_header_title = __('Search Results For: ' . get_search_query(), 'masonic');
        } elseif (is_page()) {
            $masonic_header_title = get_the_title();
        } elseif (is_single()) {
            $masonic_header_title = get_the_title();
        } else {
            $masonic_header_title = '';
        }

        return $masonic_header_title;
    }

endif;
?>