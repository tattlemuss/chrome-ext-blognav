function add_link(div, text, href) {
    var a = document.createElement('a');
    var linkText = document.createTextNode(text);
    a.appendChild(linkText); 
    a.href = href;
    div.appendChild(a)
}

function add_pad(div) {
    var a = document.createTextNode(' ');
    div.appendChild(a)
}

// <link rel="stylesheet" href="http://russelldavies.typepad.com/planning/styles.css?v=6" type="text/css" media="screen" />
function add_css(href) {
    var a = document.createElement('link');
    a.rel = "stylesheet";
    a.type = "text/css";
    a.media = "screen";
    a.href = href;
    document.head.appendChild(a)
}

var foundLinks = new Array();

// Search for "link-rel" elements in the header
var headChildren = document.head.getElementsByTagName('link');
for (var i = 0; i < headChildren.length; ++i) {
    //code
    var child = headChildren[i];
    if (child.rel == 'prev') {
        foundLinks.push({text: "<< PREV", href : child.href})
    }
    if (child.rel == 'next') {
        //code
        foundLinks.push({text: "NEXT >>", href : child.href})
    }
}

if (foundLinks.length != 0) {
    //code
    var div = document.createElement('div');
    div.id = "blognav-custom-nav";
    
    document.body.appendChild(div);
    
    var l = foundLinks.length;
    for (var i = 0; i < l; ++i)
    {
        var el = foundLinks[i];
        add_link(div, el.text, el.href);
        add_pad(div);        
    }
    
    // Insert custom CSS
    add_css(chrome.runtime.getURL("blognav.css"));
}
