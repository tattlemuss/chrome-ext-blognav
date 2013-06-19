// Use Immediately Invoked Function Expression to avoid namespace pollution
(function(){

    var addLink = function(div, text, href) {
        var a = document.createElement('a');
        var linkText = document.createTextNode(text);
        a.appendChild(linkText); 
        a.href = href;
        div.appendChild(a)
    }
    
    var addPadding = function(div) {
        var a = document.createTextNode(' ');
        div.appendChild(a)
    }
    
// e.g. <link rel="stylesheet" href="http://russelldavies.typepad.com/planning/styles.css?v=6" type="text/css" media="screen" />
    var add_css = function(href) {
        var a = document.createElement('link');
        a.rel = "stylesheet";
        a.type = "text/css";
        a.media = "screen";
        a.href = href;
        document.head.appendChild(a)
    }
    
    var foundLinks = {};
    
    // Search for "link-rel" elements in the header
    var headChildren = document.head.getElementsByTagName('link');
    var foundAny = false;
    for (var i = 0; i < headChildren.length; ++i) {
        //code
        var child = headChildren[i];
        var reltag = child.rel.toLowerCase();
        if (reltag == 'prev') {
            foundLinks['prev'] = {text: "<<<", href: child.href};
            foundAny = true
        }
        else if (reltag == 'next') {
            foundLinks['next'] = {text: ">>>", href: child.href};
            foundAny = true
        }
        else if (reltag == 'start') {
            foundLinks['start'] = {text: "Start", href: child.href};
            foundAny = true
           
        }
    }

    // Only create our interface if we find any links    
    if (foundAny) {
        var div = document.createElement('div');
        div.id = "blognav-custom-nav";
        
        document.body.appendChild(div);

        // Run through links in the order we want
        var keys=["start", "prev", "next"];
        var first = true;
        keys.forEach( function(s) { 
            var el = foundLinks[s];
            if (el) {
                if (!first) {
                    addPadding(div);
                }
                addLink(div, el.text, el.href);
                first = false;
            }
        } )
        
        // Insert custom CSS
        add_css(chrome.runtime.getURL("blognav.css"));
    }
}
)();


