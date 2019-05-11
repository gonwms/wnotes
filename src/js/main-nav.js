'use strict'

var mainNav = (function () {

    //Global bar
    var nav;

    //function init :: listen app "List Loaded"
    function init() {
        var mainNavHighlight = document.createElement('DIV');
        nav = document.querySelector('[data-id="main_nav"] NAV')
        mainNavHighlight.classList.add('highlight');
        nav.insertAdjacentElement('afterend', mainNavHighlight);
        server.on('List-Loaded', createMainNav)
    };

    //function createMainNav
    var createMainNav = function (contentList) {
        // console.log(contentList)

        contentList.list.forEach(function (o) {
            // console.log(Object.keys(o));  console.log(Object.values(o)); console.log(Object.entries(o)); console.log(o.name);
            nav.innerHTML += `<li><a href="/src/docs/${o.name.toLowerCase()}.md">${o.name}</a></li>`
            // console.log(o.name.toLowerCase());

        });
        MainNavClicked()
    };
    var currShape = { y: 0, x: 0, h: 30, w: 150, }
    //function MainNavClicked :: Server emit nav "item clicked"
    function MainNavClicked() {
        nav.addEventListener('click', function (e) {
            //UI
            if (e.target.tagName == 'LI' || e.target.tagName == 'A') {
                var tiempo = 0.0077;
                console.log(e.target.closest('LI').childNodes[0]);

                var t = e.target.closest('LI').firstChild;

                var targetGeometry = t.getBoundingClientRect();
                var padding = { h: 0, w: 5 };
                var targetShape = {
                    y: targetGeometry.top - padding.h,
                    x: targetGeometry.left - padding.w,
                    h: targetGeometry.height,
                    w: targetGeometry.width,
                }

                var velocidad = {
                    v: Math.abs((targetShape.y - currShape.y) * tiempo / 2).toFixed(2),
                    h: Math.abs((targetShape.w - currShape.w) * tiempo / 2).toFixed(1)
                }
                console.log(velocidad.h);

                var highlight = document.querySelector('.highlight');
                highlight.style.cssText += `
                        height : ${targetShape.h}px;
                        width  : ${targetShape.w}px;
                        top    : ${targetShape.y}px;
                        left   : ${targetShape.x}px;
                        padding: ${padding.h}px ${padding.w}px;
                        transform-origin: right;
                        transition: top ${velocidad.v}s ease, width ${velocidad.h}s ease-in
                    `
                // console.log(velocidad);
                currShape = targetShape;

                //logic
                e.preventDefault();
                var link = t['href'];
                if (link != null) { server.emit("item-clicked", link) };
            }
        });
    };

    return {
        init: init
    };

})();
