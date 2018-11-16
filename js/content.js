'use strict'


/*
loadDocuments:
			nav listen "item clicked"
			emit "content Loaded"
*/

 var loadDocuments = (function () {

		function init() {
			container = document.querySelector('.content')		
			server.on("item-clicked", serverRequestDocument)
		}
	
	
		function serverRequestDocument(link) {
	
			var xhr = new XMLHttpRequest();
			xhr.open('GET', link);
			xhr.onload = function () {
				if (xhr.status === 200) {
	
					container.innerHTML = xhr.responseText						
					htmlPluck.init();
					// codeHighlight.init(container);

					server.emit('content-Loaded', container)

				} else {
					console.error( xhr.status + '  no se pudo cargar el documento');
				}
			};
			xhr.send();	
	
		}

		function con() {console.log(code)};
		
		var container;
	

		return{
			init:init,
			con:con
		}
	
	
	})()

//function formatContent :listen "content Loaded"

	//DOM attach
	//htmlPluck
	//hightligt

//CreateContentTree :listen "content Loaded"
	//DOM attach



//desplumar html para que funcione con highlight.js
var htmlPluck = (function () {
	
	
	
	function init() {

		var content = document.querySelector('.content')
		var htmlCode = Array.from(content.querySelectorAll('.html'))

		htmlCode.forEach(function (code) {
			var str = code.innerHTML
			code.innerHTML = htmlEntities(str)
			
		});

		
	}
	function htmlEntities(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	server.on('content Loaded', init )
	
	return {
		init: init
	}

})()

var codeHighlight = (function(){

	function init(container){
		code = Array.from(container.querySelectorAll('CODE'))
		highlight()
		
	}

	function highlight(){
		code.forEach(function(code){
			console.log(code)
			hljs.highlightBlock(code);

		})
	}

	var code;

	server.on('content-Loaded', init)

	return{
		init:init
	}
})()


var CreateContentTree = function(){
	
	// var content = document.querySelector('.content');
	// var tree = document.querySelector('.tree');
	// var h2 = Array.from(content.querySelectorAll('H2'));
	

	// h2.forEach(function(){

	// 	//agregarle id a los h2

	// 	//insetar link con nombre y url en el tree

	// 	//hacer segundo nivel de colapsable

	// 	// hacer 
	// })

	// return{
	// 	init:init
	// }
}

