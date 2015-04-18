var EUCL = {};
EUCL.jquery = null;
EUCL.domain = '.sas.com';
if(window.location.hostname.indexOf("jmp") >= 0) {
	EUCL.domain = '.jmp.com';
}
EUCL.createCookie = function(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; domain=" + EUCL.domain + "; path=/";
};

EUCL.readCookie = function(n) {
    var nEQ = n + "=";
    var a = document.cookie.split(';');
    for(var i=0;i < a.length;i++) {
        var c = a[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nEQ) === 0) {
            return c.substring(nEQ.length,c.length);
        }
    }
    return null;
};

/* Load jQuery into local variable if not already present. 
   Use noConflict so it doesn't mess with any jQuery added to page later */
EUCL.loadScript = function(callback) {
    if(window.jQuery) {
        /*jQuery already present*/
        callback();
    } else {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = (("https:" == document.location.protocol) ? "https://" : "http://") + "ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
        document.getElementsByTagName("head")[0].appendChild(script);
        if (script.readyState) { /*IE*/
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    EUCL.jquery = $.noConflict(true);
                    callback();
                }
            };
        } else { /*Others*/
            script.onload = function () {
                EUCL.jquery = $.noConflict(true);
                callback();
            };
        } 
    }
};

EUCL.showOptInForm = function(x) {
    this.loadScript(function () {
        var jqry,en,da,nl,z;
        jqry = EUCL.jquery===null ? jQuery : EUCL.jquery;
        en = ["This site performs best with cookies enabled.","Enable","Read More","Cookies enabled."];/*english*/
        da = ["Denne side fungerer bedst med cookies aktiveret.","Aktiver","L&#230;s mere","Cookies aktiveret."];/*danish*/
        nl = ["Wij gebruiken cookies om uw instellingen en voorkeuren te onthouden, zodat wij u nog beter van dienst kunnen zijn. Gaat u akkoord met het gebruik van cookies op deze site?","Activeren","Lees onze privacy statement","Cookies geactiveerd."];/*dutch*/
        if (x=='da') {
            z=da;
        } else if (x=='nl') {
            z=nl;
        } else {
            z=en;
        }
        //disabled as part of the CQ5 move as we are wrapping the css into the style libs
        //var css = (("https:" == document.location.protocol) ? "https://" : "http://") + document.domain + '/css/cookiealert.css';
        //jqry('head').append('<link type="text/css" rel="stylesheet" href="' + css + '" />');
        // TODO: the hard coding for the privacy page needs to change but we need to determine the international strucuture first
        jqry(document).ready(function() {
            jqry('body').prepend('<div style="display:none" id="cookiealert" class="alert"><h2>' + z[0] + '</h2> <button id="eu-optin"><span>' + z[1] + '</span></button> <a href="/Privacy.html#cookies">' + z[2] + '</a></div>');
            jqry('#cookiealert').children('button#eu-optin').click(
                function(){
                    EUCL.createCookie('eucookielaw','optin', (3*365));/*3 years*/
                    jqry('#cookiealert').toggleClass('alertgreen');
                    jqry('#cookiealert').children('h2').html(z[3]);
                    jqry("#cookiealert").delay(800).slideUp('slow');
                }
            );
            jqry("#cookiealert").delay(800).slideDown('slow');
        });
    });
};

EUCL.checkNonEU = function() {
    var eucl_cookie = this.readCookie('eucookielaw');
    if (eucl_cookie === null || eucl_cookie == 'optin') {
        return 'optin';
    } else {
        return eucl_cookie; /*optout*/
    }
};

EUCL.checkEU = function(x) {
    var eucl_cookie = this.readCookie('eucookielaw');
    if (eucl_cookie === null) {
        /*no cookie so set session cookie*/
        this.createCookie('eucookielaw','session', '');
        this.showOptInForm(x);
        return 'session';
    } else if (eucl_cookie == 'session') {
        this.showOptInForm(x);
        return eucl_cookie;
    } else {
        /*optin/optout*/
        return eucl_cookie;
    }
};
// set language in variable

var documentPath = document.URL;

// Our multisite manager structure is based on premise of languagecode_countrycode being in the path
// So we can figure out language for EU cookie based on languagecode_countrycode
if ( documentPath.indexOf('/en_gb/') > 0 ) {
    eucookielaw = EUCL.checkEU('en');    // United Kingdom
} else if ( documentPath.indexOf('/da_dk/') > 0 ) {
    eucookielaw = EUCL.checkEU('da');    // Denmark
} else if ( documentPath.indexOf('/nl_nl/') > 0 ) {
    eucookielaw = EUCL.checkEU('nl');    // Netherlands
} else {
    eucookielaw = EUCL.checkNonEU();     // everything else
}
