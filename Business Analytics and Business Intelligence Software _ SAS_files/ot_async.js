
// 
// Copyright (c) 2013 by SAS Institute Inc., Cary, NC, USA. All Rights Reserved.
//
// $Date: 2013/11/08 17:06:42 $
// $Revision: 1.1.2.6 $
//

(function(w,doc,script,delay) {
  function lt() {
    var u='//ots.sas.com/js/ot-min.js',
        async_scid='ob-script-async',  // when you include this script, give it id=<async_scid>
        scid='ob-script',
        scattrid='a',
        js, 
        fjs = doc.getElementsByTagName(script)[0],
        getA = function(scriptId,attrId) { 
           var oa = document.getElementById(scriptId); 
           if ((oa != null) && (typeof oa.attributes == "object") && (typeof oa.attributes.getNamedItem != "undefined"))
           {
               var a = oa.attributes.getNamedItem(attrId);
               return a != null ? a.nodeValue : null; 
           }
           else return null;
        },
        add = function(url,id,attrId) {
            if (doc.getElementById(id)) {return;}
            js = doc.createElement(script);
            js.src = url;
            id && (js.id = id);
            if (id && attrId) { 
               var a = getA(async_scid,attrId); 
               if (a!=null) {
                   var aa=document.createAttribute(attrId);
                   aa.nodeValue=a;
                   js.attributes.setNamedItem(aa);
               }
            }
            fjs.parentNode.insertBefore(js, fjs);
        }
        add(u,scid,scattrid);
    }
    if (delay) // wait for onload
    {
       if (w.addEventListener) { w.addEventListener("load", lt, false); }
       else if (w.attachEvent) { w.attachEvent("onload",lt); }
    }
    else
    {
       lt();
    }
}(window, document, 'script', true));

