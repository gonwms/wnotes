'use strict'


var loadDocuments = (function () {
    //global variables
    var content;
        function init() {
        content = document.querySelector('.content');

        //nav emit "item clicked" 
        server.on("item-clicked", serverRequestDocument);
    }

    function serverRequestDocument(link) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', link);
        xhr.onload = function () {
            if (xhr.status === 200) {

                content.innerHTML = marked(xhr.responseText);
                titleH2defineChapter();
                // htmlPluck.init();
                server.emit('content-Loaded', content);

            } else {
                console.error(xhr.status + '  no se pudo cargar el documento');
            }
        };
        xhr.send();

    }

    return {
        init: init,
        content: content
    };

})();

// var mdToHTML = (function () {

    //     function init() {
    //         var content = document.querySelector('.content')
    //         transform(content)
    //     }

    //     function transform(c) {

    //         var TitleMDRegEx = /^(#+\s)(.+)/gm;
    //         var codeMDRegEx = /^\`{3}(\w+)((.|\n+)*?)\`{3}/gm; //```
    //         var listMDRegEx = /(^((\-\s)|(\d+\.\s)).+?\n)+/gm
    //         var textMDRegEx = /^([\w\d]+[^\n]+)/gm;
    //         var imgsMDRegEx = /^\!\[([.+]?)\]\((.+)".+"\)/gm;
    //         var linkMDRegEx = /^\[(.+)\]\((.+)\)/gm;
    //         var strongMDRegEx = /\`(.+)\`/gm;

    //         var str = c.innerHTML;
    //         var titlesArr; var codeArr; var listArr; var textArr; var imgArr; var linkArr; var strongkArr;

    //         while ((titlesArr = TitleMDRegEx.exec(str)) !== null) {
    //             c.innerHTML = c.innerHTML.replace(titlesArr[0], `<h${titlesArr[1].length - 1}>${titlesArr[2]}</h${titlesArr[1].length - 1}>`)
    //         }

    //         while ((codeArr = codeMDRegEx.exec(str)) !== null) {
    //             c.innerHTML = c.innerHTML.replace(codeArr[0], `<pre><code class="${codeArr[1]} HTML">${codeArr[2]}</pre></code>`)
    //         }

    //         while ((listArr = listMDRegEx.exec(str)) !== null) {
    //             var lis = listArr[0].split(/\n/).map(function (item) {
    //                 if (item != '') {
    //                     return item = '<li>' + item.slice(2) + '</li>'
    //                 }
    //             })
    //             if (listArr[2] != '- ') {
    //                 c.innerHTML = c.innerHTML.replace(listArr[0], `<ol>${lis.join('')}</ol>`)
    //             }
    //             else {
    //                 c.innerHTML = c.innerHTML.replace(listArr[0], `<ul>${lis.join('')}</ul>`)
    //             }
    //         }

    //         while ((imgArr = imgsMDRegEx.exec(str)) !== null) {
    //             c.innerHTML = c.innerHTML.replace(imgArr[0], `<img src="${imgArr[2]}" alt="${imgArr[1]}">`)

    //         }
    //         while ((linkArr = linkMDRegEx.exec(str)) !== null) {
    //             c.innerHTML = c.innerHTML.replace(linkArr[0], `<a href="${linkArr[2]}">${linkArr[1]}</a>`)
    //         }
    //         while ((strongkArr = strongMDRegEx.exec(str)) !== null) {
    //             c.innerHTML = c.innerHTML.replace(strongkArr[0], `<strong>${strongkArr[1]}</strong>`)
    //         }
    //         // while((textArr = textMDRegEx.exec(str)) !== null){
    //         // c.innerHTML = c.innerHTML.replace(textArr[0],`<p>${textArr[1]}</p>`)
    //         // }

    //         htmlPluck.init();
    //         // focusContent.init();
    //     }

    //     // server.on('content-Loaded', init )

    //     return {
    //         init: init,
    //     }

    // })()


// var htmlPluck = (function () {

    //     function init() {

    //         var content = document.querySelector('.content')
    //         var htmlCode = Array.from(content.querySelectorAll('.HTML'))

    //         htmlCode.forEach(function (code) {
    //             var str = code.innerHTML
    //             code.innerHTML = htmlEntities(str)
    //         });
    //         server.emit('content-pluck')
    //     }

    //     function htmlEntities(str) {
    //         return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); //.replace(/'/g,'&apos;')

    //     }

    //     return {
    //         init: init
    //     }

    // })()

var codeHighlight = (function () {
    var code;
    function init() {
        code = Array.from(document.querySelectorAll('CODE'));
        highlight();
    }
    function highlight() {
        code.forEach(function (code) {
            // console.log(code)
            hljs.highlightBlock(code);

        });
    }
    server.on('content-Loaded', init);

    return {
        init: init
    };
})();


var titleH2defineChapter = function () {
    var contentFirstElement = document.querySelector('.content').firstElementChild;
    iterate(contentFirstElement);

    var currChapterContainerDiv;
    function iterate(currElement){
  
        if(currElement.tagName == 'H2'){
            currChapterContainerDiv = document.createElement('DIV');
            currChapterContainerDiv.classList.add('capitulo');
            currElement.insertAdjacentElement('beforebegin', currChapterContainerDiv);
        }

        if(currChapterContainerDiv != undefined){
            currChapterContainerDiv.insertAdjacentElement('beforeend', currElement);   
            currElement = currChapterContainerDiv;
        }

        //recursive
        if (currElement.nextElementSibling != undefined){
            iterate(currElement.nextElementSibling);
        }
        else{
            return;
        } 
    }

};