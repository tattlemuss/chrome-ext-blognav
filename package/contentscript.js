// Use Immediately Invoked Function Expression to avoid namespace pollution
(function(){
    var addLink = function(div, text, alt, href) {
        var a = document.createElement('a');
        var tn = document.createTextNode(text);
        a.appendChild(tn); 
        a.href = href;
        a.title = alt;
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
            foundLinks['prev'] = {img_url: "<", alt:"prev", href: child.href};
            foundAny = true
        }
        else if (reltag == 'next') {
            foundLinks['next'] = {img_url: ">", alt:"next", href: child.href};
            foundAny = true
        }
        else if (reltag == 'start') {
            foundLinks['start'] = {img_url: "^", alt:"start", href: child.href};
            foundAny = true
           
        }
    }

    // Only create our interface if we find any links    
    if (foundAny) {
        var div = document.createElement('div');
        var divname_base = "blognav-custom-nav-fsdfjdsiofusdfsoooo blognav-custom-nav-fsdfjdsiofusdfsoooo-";        
        chrome.storage.sync.get({
            location: 'bl'
        }, function(items) {
            div.className = divname_base.concat(items.location);
        });
        
        // Insert image
        var img = document.createElement('img');
        img.src = chrome.runtime.getURL("icon.png");
        div.appendChild(img);

        // Run through links in the order we want
        var keys=["prev", "start", "next"];
        var first = true;
        keys.forEach( function(s) { 
            var el = foundLinks[s];
            if (el) {
                addLink(div, el.img_url, el.alt, el.href);
                first = false;
            }
        } ) // forEach
        
        // Insert custom CSS
        document.body.appendChild(div);
        
        add_css(chrome.runtime.getURL("blognav.css"));
    }
}
)();
