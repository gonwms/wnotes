'use strict'

//cargar documento
var loadDocuments = (function () {

	function init() {
		container = document.querySelector('.content')		
		//nav emit "item clicked" 
		server.on("item-clicked", serverRequestDocument)
	}

	function serverRequestDocument(link) {
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', link);
		xhr.onload = function () {
			if (xhr.status === 200) {

				container.innerHTML = xhr.responseText						
				htmlPluck.init();
				server.emit('content-Loaded', container)

			} else {
				console.error( xhr.status + '  no se pudo cargar el documento');
			}
		};
		xhr.send();	

	}

	function content() {
		console.log(code)
	};
	
	var container;

	return{
		init:init,
		content:content
	}


})()

//Formatear documento
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
			// console.log(code)
			hljs.highlightBlock(code);

		})
	}

	var code;

	server.on('content-Loaded', init)

	return{
		init:init
	}
})()

//crear content tree
var CreateContentTree = (function(){

	function init(contenido){
		
		tree = document.querySelector('.tree');
		tree.innerHTML ='';
		h2 = Array.from(contenido.querySelectorAll('H2'));
		renderTree()
	}

	function renderTree(){

		h2.forEach(function(item,index){
			console.log(item.innerText);
			
			//agregarle id a los h2
			item.setAttribute('id',index)
			tree.innerHTML += `<div><a href="#${index}">${item.innerText}</a></div>`

			//hacer segundo nivel de colapsable

			// hacer 
		})
	}

	var tree; var h2;

	server.on('content-Loaded', init)

	return{
		init:init
	}
})()

