var CreateContentTree = (function(){
	
	//global variables
	var tree; var titles; var DOMPosition;
	
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
					var rTimes = curr[1] - next[1] // vueltas de recursion. ej: h4-h1 = 3 vueltas.
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
			e.preventDefault()
			if(e.target.parentElement.classList.contains('has-child')){
				e.target.parentElement.classList.toggle('collapse')

			}
			if(e.target.hasAttribute('href')){

				var content =document.querySelector('.content')
				var titleTarget = document.querySelector(`${e.target.getAttribute('href')}`)		
				var pos = titleTarget.offsetTop -200 // posición de titulo menos algunos pixeles
				
				// setInterval(()=> console.log(content.scrollTop),500)
				// setInterval(()=> console.log('altura', content.scrollHeight),500)
				// console.log('objetivo ',pos)
				
				
				function paint(){
					
					if(content.scrollTop == pos || content.scrollTop == 0 || content.scrollTop == content.scrollHeight){
						titleTarget.classList.add('focus')
						setTimeout(()=>	titleTarget.classList.remove('focus'),250)
						content.removeEventListener('scroll', paint);
						
					}
				}
				content.scrollTo(0,pos);	
				content.addEventListener('scroll', paint);

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



	server.on('content-Loaded', init)

	return{
		init:init
	}
})()