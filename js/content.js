'use strict'


var loadDocuments = (function () {

	function init() {
		content = document.querySelector('.content')
		
		//nav emit "item clicked" 
		server.on("item-clicked", serverRequestDocument)
	}

	function serverRequestDocument(link) {
			
		var xhr = new XMLHttpRequest();
		xhr.open('GET', link);
		xhr.onload = function () {
			if (xhr.status === 200) {

				content.innerHTML = xhr.responseText						
				htmlPluck.init();
				server.emit('content-Loaded', content)

			} else {
				console.error( xhr.status + '  no se pudo cargar el documento');
			}
		};
		xhr.send();	

	}

	function content() {
		console.log(code)
	};
	
	var content;

	return{
		init:init,
		content:content
	}

})()

var mdToHTML = (function(){
	function init(){
		var content = document.querySelector('.content')
		transform(content)
	}

	function transform(c){
		var title  = /^(#*\s)([\d\wñÑ\s]+)\b/gm;
		var wrapTitle = c.innerHTML.replace(title,'<h$1>$2</h$1>')
		c.innerHTML = wrapTitle.replace(/#/,'1').replace(/##/,'2').replace(/###/,'3').replace(/####/,'4').replace(/#####/,'5')
		transformList(c)
	}

	function transformList(c){
	var list  = /^(\d*\. )([.]*)/gm;
	var wraplist = c.innerHTML.replace(list,'<li>$2</li>')
	c.innerHTML = wraplist
	}

	server.on('content-Loaded', init )
	
	return{
		init:init,
	}

})()

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

	// server.on('content-Loaded', init )
	
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

var CreateContentTree = (function(){

	function init(contenido){
		
		tree = document.querySelector('.tree');
		tree.innerHTML ='';
		titles = Array.from(contenido.querySelectorAll('H2, H3, H4'));
		DOMPosition = tree
		renderTree()

	}

	function createNewNode(el, p, returnPosition = true, hasAchild = false ) {

		var linkformat = el.innerText.replace(/[^A-Za-z0-9-]/g, '-');
		var newNode = document.createElement('DIV');

		newNode.setAttribute('class',`tree-sub tree-sub${el.tagName[1]}`)
		
	

		newNode.innerHTML = `<div class="nav-item"><a href="#${linkformat}">${el.innerText}</a></div>` 
		p.appendChild(newNode)

		//add id al doc tittles
		el.setAttribute('id',linkformat)
	
		if(hasAchild == true ){
			newNode.classList.add('has-child')
		}

		if(returnPosition == true ){
			return DOMPosition = newNode
		}



	}

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
			
			//prevent error on next
			if (index < arr.length - 1) {

				var curr = item.tagName
				var next = arr[index + 1].tagName
						
				if (curr > next) { //[h3,h2]
					var rTimes = curr[1] - next[1]
					createNewNode(item,DOMPosition,true,false)
					recurtion(DOMPosition, rTimes)
				}	  	
				else if (curr < next) {		//[h2,h3]
					createNewNode(item,DOMPosition,true,true)
					
				}	
				else {//[h3,h3]
					createNewNode(item,DOMPosition,false,false)
				}
			}

			else{
				//last item: next = null
				createNewNode(item,DOMPosition)
			}

		})
		collapsable.init()
	}	

	var collapsable = (function () {
		
		function init(){

			var collapsables = Array.from(tree.querySelectorAll('.has-child'))
			collapsables.forEach(function(item){
				item.style.maxHeight = `${item.getBoundingClientRect().height}px`
				item.classList.toggle('collapse')
			})
			
			tree.addEventListener('click', toggleTree)	
		}

		function toggleTree(e){
			// e.preventDefault()
			console.log(e.target.getAttribute('class'));
			
			if(e.target.parentElement.classList.contains('has-child')){
				e.target.parentElement.classList.toggle('collapse')
				console.log(e.target.parentElement.getBoundingClientRect())
			}
		}

		function remove(){
			document.removeEventListener('click', toggleTree)
		}

		server.on("item-clicked", remove)

		return{
			init:init
		}
	})()

	var tree; var titles; var DOMPosition;

	server.on('content-Loaded', init)

	return{
		init:init
	}

})()

