// Use Immediately Invoked Function Expression to avoid namespace pollution
(function(){
    var addLink = function(div, text, href) {
        var a = document.createElement('a');
        var tn = document.createTextNode(text);
        a.appendChild(tn); 
        a.href = href;
        div.appendChild(a)
    }
    
    var addPadding = function(div) {
        var a = document.createTextNode(' ');
        div.appendChild(a)
    }
    
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
            foundLinks['prev'] = {img_url: "<", href: child.href};
            foundAny = true
        }
        else if (reltag == 'next') {
            foundLinks['next'] = {img_url: ">", href: child.href};
            foundAny = true
        }
        else if (reltag == 'start') {
            foundLinks['start'] = {img_url: "up", href: child.href};
            foundAny = true
           
        }
    }

    // Only create our interface if we find any links    
    if (foundAny) {
        var div = document.createElement('div');
        div.className = "blognav-custom-nav-fsdfjdsiofusdfsoooo blognav-custom-nav-fsdfjdsiofusdfsoooo-bl";
        
        document.body.appendChild(div);

        //var img = document.createElement('img');
        //img.src = chrome.runtime.getURL("icon.png");
        //div.appendChild(img); 

        // Run through links in the order we want
        var keys=["start", "prev", "next"];
        var first = true;
        keys.forEach( function(s) { 
            var el = foundLinks[s];
            if (el) {
                if (!first) {
                    //addPadding(div);
                }
                addLink(div, el.img_url, el.href);
                first = false;
            }
        } )
        
        // Insert custom CSS
        add_css(chrome.runtime.getURL("blognav.css"));
    }
}
)();


