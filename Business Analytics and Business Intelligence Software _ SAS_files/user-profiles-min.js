(function(i){var f=false;var k=false;
var q=false;n(function(){f=true;
if(!g.isCrossDomain||(g.isCrossDomain&&k)){p()
}});function p(){k=true;if(f&&!q){try{var t=a(g.authCookieName);
var w=a(g.persistCookieName);var v=a(g.userCookieName);
if((t==null||t==""||t.charAt(0)==":")&&(w!=null&&w!=""&&w.charAt(0)!=":")){window.location.href=g.loginURL+"?realm=/extweb&goto="+encodeURIComponent(window.location.href)
}if(t!=null&&t!=""&&t.charAt(0)!=":"){if(v!=null&&v!=""&&v.charAt(0)!=":"){r()
}else{h()}}else{s()}q=true}catch(u){}}}i.displayLoginBar=p;
function m(t){window.location.href=g.serverURL+"create.htm?returnURL="+encodeURIComponent(window.location.href)+"&"+l(t)
}i.handleCreateProfile=m;function c(u,v){var t="";
if(typeof v!="undefined"&&v!=null&&v==true){t="&showNewUserDisplay=false"
}window.location.href=g.loginURL+"?realm=/extweb&goto="+encodeURIComponent(j(window.location.href))+"&"+l(u)+t
}i.handleLogin=c;function b(t){window.location.href=g.serverURL+"passwordResetRequest.htm?returnURL="+encodeURIComponent(window.location.href)+"&"+l(t)
}i.handleForgottenPWD=b;function o(){window.location.href=g.logoutURL+"?realm=/extweb&goto="+encodeURIComponent(j(window.location.href))
}i.handleLogout=o;function s(){try{var y=document.getElementById("logout");
if(y!=undefined){y.style.display="none"
}var w=document.getElementById("login");
if(w!=undefined){w.style.display="block"
}var v=document.getElementById("logout2");
if(v!=undefined){v.style.display="none"
}var u=document.getElementById("logout3");
if(u!=undefined){u.style.display="none"
}var t=document.getElementById("logout4");
if(t!=undefined){t.style.display="none"
}var z=document.getElementById("login2");
if(z!=undefined){z.style.display="block"
}}catch(x){}}function r(){try{var A=d();
var B=document.getElementById("logout");
if(B!=undefined){B.style.display="block"
}var z=document.getElementById("login");
if(z!=undefined){z.style.display="none"
}var y=document.getElementById("logout2");
if(y!=undefined){y.style.display="block"
}var w=document.getElementById("logout3");
if(w!=undefined){w.style.display="block"
}var v=document.getElementById("logout4");
if(v!=undefined){v.style.display="block"
}var t=document.getElementById("login2");
if(t!=undefined){t.style.display="none"
}var u=document.getElementById("loginDisplayName");
if(u!=undefined){u.style.display="inline";
u.innerHTML=A}}catch(x){}}function h(){o()
}function d(){var t;try{t=decodeURIComponent(a(g.userCookieName))
}catch(u){t="not available"}t=t.replace(/\+/g," ");
return t}function l(t){if(t!=null&&t!=""){return"locale="+t
}else{return""}}function j(t){var u;
if(g.isCrossDomain){return g.baseURL+"/profile/xdomain/redirect?xgoto="+e.base64Encode(t)
}else{return t}}var g={authCookieName:"_iPlanetDirectoryPro",persistCookieName:"_DProPCookie",baseURL:"",loginBaseURL:"",loginURL:"/opensso/UI/Login",logoutURL:"/opensso/UI/Logout",serverURL:"/profile/user/",userCookieName:"SASUserDisplayName",isCrossDomain:false,init:function(){var w=document.location.host;
var u=/prod/;var y=/stage/;var v=/col=wwwstage/;
var x=/exp/;var t=/profiledev/;
var z=/^(.*\.)?sas\.com$/;if(w=="support.sas.com"||w=="www.sas.com"||w=="www.jmp.com"||(u.test(w)&&!v.test(document.location.search))){this.authCookieName="ep"+this.authCookieName;
this.persistCookieName="ep"+this.persistCookieName;
this.baseURL="https://www.sas.com";
this.loginBaseURL="https://login.sas.com";
this.loginURL=this.loginBaseURL+this.loginURL;
this.logoutURL=this.loginBaseURL+this.logoutURL;
this.serverURL=this.baseURL+this.serverURL
}else{if(y.test(w)||v.test(document.location.search)){this.authCookieName="es"+this.authCookieName;
this.persistCookieName="es"+this.persistCookieName;
this.baseURL="https://wwwstage.sas.com";
this.loginBaseURL="https://loginstage.sas.com";
this.loginURL=this.loginBaseURL+this.loginURL;
this.logoutURL=this.loginBaseURL+this.logoutURL;
this.serverURL=this.baseURL+this.serverURL
}else{if(x.test(w)){this.authCookieName="ee"+this.authCookieName;
this.persistCookieName="ee"+this.persistCookieName;
this.baseURL="https://www.sas.com";
this.loginBaseURL="https://loginexp.sas.com";
this.loginURL=this.loginBaseURL+this.loginURL;
this.logoutURL=this.loginBaseURL+this.logoutURL;
this.serverURL=this.baseURL+this.serverURL
}else{if(t.test(w)){this.authCookieName="ed"+this.authCookieName;
this.persistCookieName="ed"+this.persistCookieName;
this.baseURL="https://profiledev.unx.sas.com";
this.loginBaseURL=this.baseURL;
this.loginURL=this.loginBaseURL+this.loginURL;
this.logoutURL=this.loginBaseURL+this.logoutURL;
this.serverURL=this.baseURL+this.serverURL
}else{this.authCookieName="et"+this.authCookieName;
this.persistCookieName="et"+this.persistCookieName;
this.baseURL="https://www.sas.com";
this.loginBaseURL="https://logintest.sas.com";
this.loginURL=this.loginBaseURL+this.loginURL;
this.logoutURL=this.loginBaseURL+this.logoutURL;
this.serverURL=this.baseURL+this.serverURL
}}}}if(!z.test(w)){this.isCrossDomain=true
}}};g.init();function a(u){var t=document.cookie.split(";");
var w=u+"=";for(var v=0;v<t.length;
v++){var x=t[v];while(x.charAt(0)==" "){x=x.substring(1,x.length)
}if(x.indexOf(w)==0){return decodeURIComponent(x.substring(w.length,x.length))
}}return null}var e={_base64KeyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",base64Encode:function(v){var t="";
var C,A,y,B,z,x,w;var u=0;v=e._utf8_encode(v);
while(u<v.length){C=v.charCodeAt(u++);
A=v.charCodeAt(u++);y=v.charCodeAt(u++);
B=C>>2;z=((C&3)<<4)|(A>>4);x=((A&15)<<2)|(y>>6);
w=y&63;if(isNaN(A)){x=w=64}else{if(isNaN(y)){w=64
}}t=t+this._base64KeyStr.charAt(B)+this._base64KeyStr.charAt(z)+this._base64KeyStr.charAt(x)+this._base64KeyStr.charAt(w)
}return t},_utf8_encode:function(u){u=u.replace(/\r\n/g,"\n");
var t="";for(var w=0;w<u.length;
w++){var v=u.charCodeAt(w);if(v<128){t+=String.fromCharCode(v)
}else{if((v>127)&&(v<2048)){t+=String.fromCharCode((v>>6)|192);
t+=String.fromCharCode((v&63)|128)
}else{t+=String.fromCharCode((v>>12)|224);
t+=String.fromCharCode(((v>>6)&63)|128);
t+=String.fromCharCode((v&63)|128)
}}}return t}};function n(y){var u=false;
var x=true;var A=window.document;
var z=A.documentElement;var D=A.addEventListener?"addEventListener":"attachEvent";
var B=A.addEventListener?"removeEventListener":"detachEvent";
var t=A.addEventListener?"":"on";
var C=function(E){if(E.type=="readystatechange"&&A.readyState!="complete"){return
}(E.type=="load"?window:A)[B](t+E.type,C,false);
if(!u&&(u=true)){y.call(window,E.type||E)
}};var w=function(){try{z.doScroll("left")
}catch(E){setTimeout(w,50);return
}C("poll")};if(A.readyState=="complete"){y.call(window,"lazy")
}else{if(A.createEventObject&&z.doScroll){try{x=!window.frameElement
}catch(v){}if(x){w()}}A[D](t+"DOMContentLoaded",C,false);
A[D](t+"readystatechange",C,false);
window[D](t+"load",C,false)}}}(this.Profile=this.Profile||{}));
function handleCreateProfile(a){Profile.handleCreateProfile(a)
}function handleLogin(a,b){Profile.handleLogin(a,b)
}function showLoginScreen(a){Profile.handleLogin()
}function handleForgottenPWD(a){Profile.handleForgottenPWD(a)
}function handleLogout(){Profile.handleLogout()
}function processLogoutRequest(){Profile.handleLogout()
};