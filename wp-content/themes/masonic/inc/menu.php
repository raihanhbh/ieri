<div class="mod mod-header">
    <div id="logo">
        <a href="http://www.sas.com/en_us.html" class="header-branding"></a>
    </div>
    <nav id="utility-nav" class="">
        <ul>
            <li class="utility-nav-profile">
                <div class="profile_login profilelogin">
                    <div style="display: block;" id="login">
                        <p class="profileLogin">
                            <button class="profhref" id="loginButton" onclick="handleLogin('en');">Log In</button>
                        </p>
                    </div>
                    <div style="display:none" id="logout" class="first">
                        <p class="profileLogin">
                            Welcome <span id="loginDisplayName"> </span>
            <span class="profileMgt">
                <a class="edit" id="editProfileButton"
                   href="http://www.sas.com/profile/user/contact.htm?locale=en_us&amp;returnURL=//www.sas.com/en_us/home.html">
                    <span>Edit Profile</span>
                </a>
                <button class="profhref" id="logoutButton" onclick="processLogoutRequest()">
                    <span>Log Out</span>
                </button>
            </span>
                        </p>
                    </div>
                </div>
            </li>
            <li class="utility-nav-wwsites" id="li-utility-nav-wwsites">
                <button id="utilahref-wwsites" class="">Registration</button>
            </li>

            <li id="header-chat">
                <div style="visibility: visible;" id="lpButtonDiv11">
                    <!--<span class="chat offline" ><a href="#" onclick=" return false;">Chat Unavailable</a></span>--></div>
            </li>
        </ul>
        <form class="is-collapsed" id="searchBox" method="get" action="#">
            <input id="searchField" name="qt" placeholder="Search" type="text">
            <input value="us" name="zz" type="hidden">
            <input value="en" name="la" type="hidden">
            <input value="| url:/en_us" name="qs" type="hidden">
            <input value="extsas" name="qc" type="hidden">
            <input value="" name="Find" id="searchButton" type="submit">
        </form>
        <button id="menu-toggle"></button>
    </nav>
</div>
</span>
<div class="mdd">
<script>
    var mddItems = [];
</script>
<nav id="nav-main">
<button id="main-menu-toggle"></button>
<ul>
<li id="mddli-software">
    <button id="mdd-software" name="mdd-software" class="nav-cat" tabindex="0">About IERI</button>
</li>

<li id="mddli-industries">
    <button id="mdd-industries" name="mdd-industries" class="nav-cat" tabindex="0">Education</button>
    <script type="text/javascript">
        var func = function () {
            SASDropdownDisplay.toggleNavPanel('mddnav-industries', 'mddli-industries')
        };
        SASHeader.addEventListener('click', func, 'mdd-industries');
    </script>
    <div class="ddpanel-wrapper">
        <div id="mddnav-industries" class="ddpanel" style="display: none;">
            <button id="close-dd-industries" class="close"></button>
            <script type="text/javascript">
                var func = function () {
                    SASDropdownDisplay.toggleNavPanel('mddnav-industries', 'mddli-industries')
                };
                SASHeader.addEventListener('click', func, 'close-dd-industries');
            </script>
            <div class="par parsys">
                <div class="text parbase section">
                </div>
                <div class="parsys_column cq-colctrl-default">
                    <div class="parsys_column cq-colctrl-default-c0">

                        <div class="parbase listgroup section">
                            <div class="syncmode  sync"></div>
                            <div class="mcl-4 numCols-">
                                <ul class="listOfItems none-list list-arrow" data-group-limit="999">
                                    <li class="listItem industry4150  childpageautomotive">
                                        <a target="_self" href="#">
                                    <span class="navigation-title">
Islamic University</span>
                                        </a>
                                    </li>
                                    <li class="listItem industry1150  childpagebanking">
                                        <a target="_self" href="#">
                                    <span class="navigation-title">
Medical College & Hospital</span>
                                        </a>
                                    </li>
                                    <li class="listItem industry3500  childpagecapital-markets">
                                        <a target="_self" href="#">
                                    <span class="navigation-title">
School & College</span>
                                        </a>
                                    </li>
                                    <li class="listItem industry5850  childpagecasinos">
                                        <a target="_self" href="#">
                                    <span class="navigation-title">
Zakat Management</span>
                                        </a>
                                    </li>
                                    <li class="listItem industry1575  childpagecommunications">
                                        <a target="_self" href="#">
                                    <span class="navigation-title">
Book's Publication</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="clear:both"></div>
                <div class="parbase section horizontalline">
                    <hr>
                </div>

            </div>
        </div>
    </div>
</li>

<li id="mddli-support-training">
    <button id="mdd-support-training" name="mdd-support-training" class="nav-cat" tabindex="0">Research</button>
    <script type="text/javascript">
        var func = function () {
            SASDropdownDisplay.toggleNavPanel('mddnav-support-training', 'mddli-support-training')
        };
        SASHeader.addEventListener('click', func, 'mdd-support-training');
    </script>
    <div class="ddpanel-wrapper">
        <div id="mddnav-support-training" class="ddpanel" style="display: none;">
            <button id="close-dd-support-training" class="close"></button>
            <script type="text/javascript">
                var func = function () {
                    SASDropdownDisplay.toggleNavPanel('mddnav-support-training', 'mddli-support-training')
                };
                SASHeader.addEventListener('click', func, 'close-dd-support-training');
            </script>
            <div class="par parsys">
                <div class="text parbase section">
                </div>
                <div class="parsys_column cq-colctrl-lt0">
                    <div class="parsys_column cq-colctrl-lt0-c0">
                        <div class="parbase listgroup section">
                            <div class="syncmode  sync"></div>
                            <div class="mcl-2 numCols-">
                                <ul class="listOfItems none-list list-arrow" data-group-limit="999">
                                    <li class="listItem  childpageproducts-solutions">
                                        <a target="_self" href="#">
                                    <span class="title">
Islamic Dawah Center</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpagesystem-requirements">
                                        <a target="_self" href="#">
                                    <span class="title">
Islamic Research Project</span>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>

                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
        </div>
    </div>
</li>
<script>
    mddItems.push('support-training');
</script>
<li id="mddli-customer-stories">
    <button id="mdd-customer-stories" name="mdd-customer-stories" class="nav-cat" tabindex="0">Our Workes</button>
    <script type="text/javascript">
        var func = function () {
            SASDropdownDisplay.toggleNavPanel('mddnav-customer-stories', 'mddli-customer-stories')
        };
        SASHeader.addEventListener('click', func, 'mdd-customer-stories');
    </script>
    <div class="ddpanel-wrapper">
        <div id="mddnav-customer-stories" class="ddpanel" style="display: none;">
            <button id="close-dd-customer-stories" class="close"></button>
            <script type="text/javascript">
                var func = function () {
                    SASDropdownDisplay.toggleNavPanel('mddnav-customer-stories', 'mddli-customer-stories')
                };
                SASHeader.addEventListener('click', func, 'close-dd-customer-stories');
            </script>
            <div class="par parsys">
                <div class="text parbase section">
                </div>
                <div class="parsys_column cq-colctrl-lt2">
                    <div class="parsys_column cq-colctrl-lt2-c1">
                        <div class="parbase listgroup section">
                            <div class="syncmode  sync"></div>
                            <div class="mcl-1 numCols-">
                                <ul class="listOfItems none-list list-arrow" data-group-limit="999">
                                    <li class="listItem  childpageby-company">
                                        <a target="_self" href="#">
                                    <span class="title">
IslamicAlo.com</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpageby-industry">
                                        <a target="_self" href="#">
                                    <span class="title">
IslamicAlo Publictions</span>
                                        </a>
                                    </li>


                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
        </div>
    </div>
</li>
<script>
    mddItems.push('customer-stories');
</script>

<li id="mddli-partners">
    <button id="mdd-partners" name="mdd-partners" class="nav-cat" tabindex="0">Media</button>
    <script type="text/javascript">
        var func = function () {
            SASDropdownDisplay.toggleNavPanel('mddnav-partners', 'mddli-partners')
        };
        SASHeader.addEventListener('click', func, 'mdd-partners');
    </script>
    <div class="ddpanel-wrapper">
        <div id="mddnav-partners" class="ddpanel" style="display: none;">
            <button id="close-dd-partners" class="close"></button>
            <script type="text/javascript">
                var func = function () {
                    SASDropdownDisplay.toggleNavPanel('mddnav-partners', 'mddli-partners')
                };
                SASHeader.addEventListener('click', func, 'close-dd-partners');
            </script>
            <div class="par parsys">
                <div class="parsys_column cq-colctrl-lt3">
                    <div class="parsys_column cq-colctrl-lt3-c0">
                        <div class="parbase listgroup section">
                            <div class="syncmode  sync"></div>
                            <div class="mcl-1 numCols-">
                                <ul class="listOfItems none-list list-arrow" data-group-limit="999">
                                    <li class="listItem  childpagealliance-partners">
                                        <a target="_self" href="#">
                                    <span class="title">
Event</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpagepartners-a-z">
                                        <a target="_self" href="#">
                                    <span class="title">
NOtice</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpagepartners-by-specialty">
                                        <a target="_self" href="#">
                                    <span class="title">
News</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div style="clear:both"></div>
            </div>
        </div>
    </div>
</li>


<script>
    mddItems.push('partners');
</script>


<li id="mddli-community">
    <button id="mdd-community" name="mdd-community" class="nav-cat" tabindex="0">Members</button>
    <script type="text/javascript">
        var func = function () {
            SASDropdownDisplay.toggleNavPanel('mddnav-community', 'mddli-community')
        };
        SASHeader.addEventListener('click', func, 'mdd-community');
    </script>
    <div class="ddpanel-wrapper">
        <div id="mddnav-community" class="ddpanel" style="display: none;">
            <button id="close-dd-community" class="close"></button>
            <script type="text/javascript">
                var func = function () {
                    SASDropdownDisplay.toggleNavPanel('mddnav-community', 'mddli-community')
                };
                SASHeader.addEventListener('click', func, 'close-dd-community');
            </script>
            <div class="par parsys">
                <div class="parsys_column cq-colctrl-lt0">
                    <div class="parsys_column cq-colctrl-lt0-c0">
                        <div class="parbase listgroup section">
                            <div class="syncmode  sync"></div>
                            <div class="mcl-2 numCols-">
                                <ul class="listOfItems none-list list-arrow" data-group-limit="999">
                                    <li class="listItem  childpagethe-corner-office">
                                        <a target="_self" href="#">
                                    <span class="title">
Founder Members</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpagethe-do-loop">
                                        <a target="_self" href="#">
                                    <span class="title">
General Members</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpagegraphically-speaking">
                                        <a target="_self" href="#">
                                    <span class="title">
Volunteers</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
        </div>
    </div>
</li>


<script>
    mddItems.push('community');
</script>


<li id="mddli-about-sas">
    <button id="mdd-about-sas" name="mdd-about-sas" class="nav-cat" tabindex="0">Donate Us</button>
    <script type="text/javascript">
        var func = function () {
            SASDropdownDisplay.toggleNavPanel('mddnav-about-sas', 'mddli-about-sas')
        };
        SASHeader.addEventListener('click', func, 'mdd-about-sas');
    </script>
    <div class="ddpanel-wrapper">
        <div id="mddnav-about-sas" class="ddpanel" style="display: none;">
            <button id="close-dd-about-sas" class="close"></button>
            <script type="text/javascript">
                var func = function () {
                    SASDropdownDisplay.toggleNavPanel('mddnav-about-sas', 'mddli-about-sas')
                };
                SASHeader.addEventListener('click', func, 'close-dd-about-sas');
            </script>
            <div class="par parsys">
                <div class="parsys_column cq-colctrl-lt3">
                    <div class="parsys_column cq-colctrl-lt3-c0">
                        <div class="parbase listgroup section">
                            <div class="syncmode  sync"></div>
                            <div class="mcl-2 numCols-">
                                <ul class="listOfItems none-list list-arrow" data-group-limit="999">
                                    <li class="listItem  childpagecompany-statistics">
                                        <a target="_self" href="#">
                                    <span class="title">
Why To Donate</span>
                                        </a>
                                    </li>
                                    <li class="listItem  childpageexecutive-bios">
                                        <a target="_self" href="#">
                                    <span class="title">
How To Donate</span>
                                        </a>
                                    </li>


                                </ul>

                            </div>
                        </div>


                    </div>
                </div>
                <div style="clear:both"></div>

                <div style="clear:both"></div>
            </div>
        </div>
    </div>
</li>

<script>
    mddItems.push('about-sas');
</script>


<li id="mddli-gallery">
    <button id="mdd-gallery" name="mdd-gallery" class="nav-cat" tabindex="0">Gallery</button>
</li>

<li id="mddli-gallery">
    <button id="mdd-gallery" name="mdd-gallery" class="nav-cat" tabindex="0">FAQ</button>
</li>

<li id="mddli-gallery">
    <button id="mdd-gallery" name="mdd-gallery" class="nav-cat" tabindex="0">Contact Us</button>
</li>

<script>
    mddItems.push('gallery');
</script>

<script>
    var mddClickAwayHandler = function () {
        for (var mddItem = 0; mddItem < mddItems.length; mddItem++) {
            var currentElem = document.getElementById('mddnav-' + mddItems[mddItem]);
            if (SASDropdownDisplay.hasClass(currentElem, 'is-active')) {
                SASDropdownDisplay.toggleNavPanel('mddnav-' + mddItems[mddItem], 'mddli-' + mddItems[mddItem]);
            }
        }
    };
    window.onload = function () {
        try {
            SASHeader.addEventListener("click", mddClickAwayHandler, "content");
            SASHeader.addEventListener("click", mddClickAwayHandler, "footer-wrapper");
            SASHeader.addEventListener("click", mddClickAwayHandler, "header-wrapper");
        } catch (e) {
            console.log("Could not register listener for mdd: " + e);
        }
    };
</script>
</ul>
</nav>
</div>