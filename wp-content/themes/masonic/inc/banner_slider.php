<?php
$images = array();
$theme_path = get_template_directory_uri();

for ($i = 1; $i <= 9; $i++) {
    $images[] = $theme_path . '/img/' . $i . '.jpg';
}

?>

<div class="basecarousel homecarousel section">
    <script type="text/javascript"
            src="Business%20Analytics%20and%20Business%20Intelligence%20Software%20_%20SAS_files/swipejs.js"></script>
    <div style="visibility: visible;" id="homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92" class="">
        <ul style="width: 5709px;" class="panels">
            <?php foreach ($images as $image): ?>
                <li data-index="0"
                    style="width: 1903px; left: 0px; transition-duration: 0ms; transform: translateX(1903px);">
                    <img alt="sas global forum audience" src="<?php echo $image; ?>">

                    <div class="contents">
                        <div class="text">
                            <a href="#">
                                <h1><span class="txt-white">Global Forum Executive Conference</span></h1>

                                <h2><span
                                        class="txt-white">Learn and network at our premier executive event April 26-29</span>
                                </h2>
                            </a>

                            <p><a href="#"></a><a
                                    href="http://www.sas.com/en_us/events/sas-global-forum-exec-2015.html"><span
                                        class="button">Reserve your seat</span></a></p>
                        </div>
                    </div>
                </li>
            <?php endforeach ?>

        </ul>
        <div class="nav-wrapper">
            <ul id="nav-homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92" class="nav">

                <?php foreach ($images as $image): ?>
                    <li>
                        <button class="slider-nav">
                            <img src="<?php echo $image; ?>" alt="">
                        </button>
                    </li>

                <?php endforeach ?>
            </ul>
        </div>
    </div>


    <script type="text/javascript">
        if (typeof CarouselLoader == "undefined") {
            var CarouselLoader = {};
        }
        CarouselLoader.createSwipe_homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92 = function () {
            var cfg = {
                startSlide: 0,
                speed: 500,
                auto: 10000,
                continuous: true,
                callback: function (index, elem) {
                },
                transitionEnd: function (index, elem) {
                    SASSwipeJS.execCallbacks('homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92', index, elem);
                }
            };
            SASSwipeJS.add('homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92', cfg);
            var transition = function (index, elem) {
                var carouselNav = 'nav-homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92',
                    carouselId = 'homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92';
                SASSwipeJS.transition(index, elem, carouselNav, carouselId);
            };
            SASSwipeJS.addCallback('homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92', transition);
            SASSwipeJS.addAnchorEventListeners('homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92');
        };
        jQuery(document).ready(function () {
            if (jQuery("#homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92").parents(".mod-tabs-content").length == 0) {
                jQuery("#homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92").removeAttr("style");
                CarouselLoader["createSwipe_homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92"]();
                if (jQuery("#homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92").siblings(".nav-buttons").length > 0) {
                    CarouselLoader["initPrevNext_homecarousel_5e9cc34ebd434cd7a3b4e49e72f9cd92"]();
                }
            }
        });
    </script>
</div>

<div class="parbase newsfeed section">
    <meta name="robots" content="noindex">
    <?php //require get_template_directory() . '/inc/newsfeed.php'; ?>
</div>