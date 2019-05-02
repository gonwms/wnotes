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
				// htmlPluck.init();
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

		var TitleMDRegEx  = /^(#+\s)(.+)/gm;
		var codeMDRegEx  = /^\`{3}(\w+)((.|\n+)*?)\`{3}/gm; //```
		var listMDRegEx  = /(^((\-\s)|(\d+\.\s)).+?\n)+/gm
		var textMDRegEx  = /^([\w\d]+[^\n]+)/gm;
		var imgsMDRegEx  = /^\!\[([.+]?)\]\((.+)".+"\)/gm;
		var linkMDRegEx  = /^\[(.+)\]\((.+)\)/gm;
		var strongMDRegEx = /\`(.+)\`/gm;
		
		var str = c.innerHTML;
		var titlesArr; var codeArr; var listArr; var textArr; var imgArr; var linkArr; var strongkArr;

		while((titlesArr = TitleMDRegEx.exec(str)) !== null){
			c.innerHTML = c.innerHTML.replace(titlesArr[0],`<h${titlesArr[1].length-1}>${titlesArr[2]}</h${titlesArr[1].length-1}>`)
		}

		while((codeArr = codeMDRegEx.exec(str)) !== null){
			c.innerHTML = c.innerHTML.replace(codeArr[0],`<pre><code class="${codeArr[1]} HTML">${codeArr[2]}</pre></code>`)
		}

		while((listArr = listMDRegEx.exec(str)) !== null){
			var lis = 	listArr[0].split(/\n/).map(function(item){ 
				if(item != ''){
					return item = '<li>'+item.slice(2)+'</li>'
				}
			})
			if(listArr[2] !='- '){
			c.innerHTML = c.innerHTML.replace(listArr[0],`<ol>${lis.join('')}</ol>`)
			}
			else{
			c.innerHTML = c.innerHTML.replace(listArr[0],`<ul>${lis.join('')}</ul>`)
			}			
		}

		while((imgArr = imgsMDRegEx.exec(str)) !== null){
			c.innerHTML = c.innerHTML.replace(imgArr[0],`<img src="${imgArr[2]}" alt="${imgArr[1]}">`)

		}
		while((linkArr = linkMDRegEx.exec(str)) !== null){
			c.innerHTML = c.innerHTML.replace(linkArr[0],`<a href="${linkArr[2]}">${linkArr[1]}</a>`)
		}
		while((strongkArr = strongMDRegEx.exec(str)) !== null){
			c.innerHTML = c.innerHTML.replace(strongkArr[0],`<strong>${strongkArr[1]}</strong>`)
		}
		// while((textArr = textMDRegEx.exec(str)) !== null){
		// 	c.innerHTML = c.innerHTML.replace(textArr[0],`<p>${textArr[1]}</p>`)
		// }

		htmlPluck.init();
		// focusContent.init();
	}

	server.on('content-Loaded', init )
	
	return{
		init:init,
	}

})()

var htmlPluck = (function () {

	function init() {

		var content = document.querySelector('.content')
		var htmlCode = Array.from(content.querySelectorAll('.HTML'))

		htmlCode.forEach(function (code) {
			var str = code.innerHTML
			code.innerHTML = htmlEntities(str)		
		});
		server.emit('content-pluck')	
	}

	function htmlEntities(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); //.replace(/'/g,'&apos;')
		
	}	
	
	return {
		init: init
	}

})()

var codeHighlight = (function(){
	
	function init(){
		code = Array.from(document.querySelectorAll('CODE'))
		highlight()		
	}

	function highlight(){
		code.forEach(function(code){
			// console.log(code)
			hljs.highlightBlock(code);

		})
	}

	var code;

	server.on('content-pluck', init)

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
		treeEvents.init()
	}	

	var treeEvents = (function () {
		
		function init(){

			var collapsables = Array.from(tree.querySelectorAll('.has-child'))
			collapsables.forEach(function(item){
				item.style.maxHeight = `${item.getBoundingClientRect().height}px`
				item.classList.toggle('collapse')
			})
			
			tree.addEventListener('click', treeClicks)	
		}

		function treeClicks(e){

			if(e.target.parentElement.classList.contains('has-child')){
				e.target.parentElement.classList.toggle('collapse')

			}
			if(e.target.hasAttribute('href')){
				var titleTarget = document.querySelector(`${e.target.getAttribute('href')}`)
				// console.log(titleTarget.getBoundingClientRect().y);
				
				
			} 

		}


		function toggleTree(e){
			e.preventDefault()

			if(e.target.parentElement.classList.contains('has-child')){
				e.target.parentElement.classList.toggle('collapse')

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

// var focusContent = (function(){
// 	function init(){
// 		var content = document.querySelector('.content')
// 		elementos = Array.from(content.querySelectorAll('H3,H2'))
		
// 		elementos.forEach(function(el){
// 			el.classList.add('fade')
// 		});
		
// 		content.addEventListener('scroll',debounce(onViewportAnimation,20))
// 	}

// 	function onViewportAnimation(){
		
// 		elementos.forEach(function(el){
// 			var positionY = Math.round(el.getBoundingClientRect().y)
// 			if(positionY < window.innerHeight &&  positionY > -100){
// 				el.classList.remove('viewport_not_visible')
// 			}
// 			else{
// 				el.classList.add('viewport_not_visible')
// 			}
// 			console.log(el.innerText +" "+positionY  +" > "+ window.innerHeight)

// 		})

// 	}
	

// 	var elementos;

// 	return{
// 		init:init
// 	}
// })()