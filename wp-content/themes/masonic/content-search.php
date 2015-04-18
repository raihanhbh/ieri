<?php
/**
 * The template part for displaying results in search pages.
 *
 * @package ThemeGrill
 * @subpackage Masonic
 * @since 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('blog-post'); ?>>
    <div class="post-header clear">
        <?php if (has_post_thumbnail()) { ?>
            <figure>
                <a href="<?php the_permalink(); ?>">
                    <?php
                    the_post_thumbnail('large-thumb');
                    ?>
                </a>
            </figure>
        <?php } ?>

        <?php if ('post' == get_post_type()) : ?>
            <div class="entry-info">
                <?php masonic_posted_on(); ?>
            </div><!-- .entry-info -->
        <?php endif; ?>
    </div>
    <!-- .entry-header -->

    <div class="entry-content">
        <?php the_title(sprintf('<h2><a href="%s" rel="bookmark">', esc_url(get_permalink())), '</a></h2>'); ?>
        <div class="underline"></div>
        <hr>
        <?php the_excerpt(); ?>
    </div>
    <!-- .entry-summary -->
</article><!-- #post-## -->