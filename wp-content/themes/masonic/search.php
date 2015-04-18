<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package ThemeGrill
 * @subpackage Masonic
 * @since 1.0
 */
?>

<?php get_header(); ?>

    <div class="site-content">
        <div id="container" class="wrapper clear">
            <div class="primary">

                <?php if (have_posts()) : ?>

                    <?php /* Start the Loop */ ?>
                    <?php while (have_posts()) : the_post(); ?>

                        <?php
                        /**
                         * Run the loop for the search to output the results.
                         * If you want to overload this in a child theme then include a file
                         * called content-search.php and that will be used instead.
                         */
                        get_template_part('content', 'search');
                        ?>

                    <?php endwhile; ?>

                    <?php masonic_paging_nav(); ?>

                <?php else : ?>

                    <?php get_template_part('content', 'none'); ?>

                <?php endif; ?>
            </div>
            <?php get_sidebar(); ?>
        </div>
        <!-- #container -->
    </div><!-- .site-content -->

<?php get_footer(); ?>