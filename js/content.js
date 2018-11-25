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
		titles = Array.from(contenido.querySelectorAll('H2, H3, H4'));
		DOMPosition = tree
		renderTree()

	}

	var createNewNode = (function () {

		function init(el, p){
			newNode = document.createElement('DIV')
			newNode.innerHTML = `<a href="#${el.innerText}">${el.innerText}</a>` 
			p.appendChild(newNode)
		}

		function returnPosition(el, p){
			init(el, p)
			return DOMPosition = newNode
		}

		var newNode;

		return{
			init:init,
			returnPosition:returnPosition,
		}
	})()

	function recurtion(p , t){
		var position = p.parentNode		
		if(t > 0){
			recurtion(position,t-1)          
		}
		else{
			return DOMPosition = position
		}
	}	

		
	function renderTree() {
		titles.forEach(function(item, index, arr) {

			//prevent error en next
			if (index < arr.length - 1) {

				var curr = item.tagName
				var next = arr[index + 1].tagName
			
				//[h3,h2]
				if (curr > next) {
					var rTimes = curr[1] - next[1]
					createNewNode.returnPosition(item,DOMPosition)
					recurtion(DOMPosition, rTimes)
				}	  
				//[h2,h3]
				else if (curr < next) {	
					createNewNode.returnPosition(item,DOMPosition)

				}
				//[h3,h3]
				else {
				//TODO hacer recursion 
				createNewNode.init(item,DOMPosition)
				// var newNode = document.createElement('DIV')
				// newNode.textContent = item.innerText
				// newNode.setAttribute('id', item.innerText)
				// DOMPosition.appendChild(newNode)
				}

			}
			else{
				//ultimo item: next = null
				createNewNode.init(item,DOMPosition)
			}

		})
	}	

	
	
	function renderTreeVieja(){
		
		// 	var titles = h2
		// 	h2.forEach(function(item,index){
		// 		// console.log(item.innerText);

		// 		//agregarle id a los h2
		// 		item.setAttribute('id',index)
		// 		tree.innerHTML += `<div><a href="#${index}">${item.innerText}</a></div>`
				
				
		// 		//hacer segundo nivel 
		// 		var currentTitle = item.nextElementSibling
		// 		// console.log(item.parentElement)
				
		// 		// var count = 1;
		// 		// var recursive = function (current) {
		// 		// 	if (current == null || current.tagName == 'H2' ) {
		// 		// 		return 
		// 		// 	}
		// 		// 	if (current.tagName == 'H3'){
		// 		// 		// titles.splice(index+count,0,current)
		// 		// 		tree.innerHTML += `<li><a href="#${current.innerText}">${current.innerText}</a></li>`	
		// 		// 		// console.log(current.innerText)
		// 		// 		count = count+1
		// 		// 		console.log(count)
		// 		// 	}
					
		// 		// 	return recursive(current.nextElementSibling)
		// 		// }
		// 		// recursive(currentTitle)
		// 		// hacer de colapsable 
		// 	})

	}

	var tree; var h2; var titles; var DOMPosition;

	server.on('content-Loaded', init)

	return{
		init:init
	}
})()

