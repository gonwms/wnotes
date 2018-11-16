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
					hljs.initHighlighting();
					server.emit('content-Loaded')

				} else {
					console.error( xhr.status + '  no se pudo cargar el documento');
				}
			};
			xhr.send();	
	
		}
	
		var container; 
	
		return{
			init:init
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
	
	server.on('content Loaded', init )
	
	function init() {

		var content = document.querySelector('.content')
		var htmlCode = Array.from(content.querySelectorAll('.html'))

		htmlCode.forEach(function (code) {
			var str = code.innerHTML
			code.innerHTML = htmlEntities(str)
			
		});
		hljs.initHighlighting()
		
	}
	function htmlEntities(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	return {
		init: init
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

