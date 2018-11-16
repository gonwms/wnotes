'use strict'

var mainNav = (function(){
	
	//function init :: listen app "List Loaded"
	function init(){
		server.on('List-Loaded', createMainNav)		
	};
	
	//function createMainNav 
	var createMainNav = function(contentList){
		// console.log(contentList)
		nav = document.querySelector('#main_bar NAV')
		contentList.list.forEach(function(o){
			// console.log(Object.keys(o));  console.log(Object.values(o)); console.log(Object.entries(o)); console.log(o.name);
			nav.innerHTML += `<li><a href="docs/${o.name}.html">${o.name}</a></li>`
		});
		MainNavClicked()		
	};

	//function MainNavClicked :: Server emit nav "item clicked"
	function MainNavClicked(){
		
		nav.addEventListener('click', function(e){
			e.preventDefault()
			var link = e.target['href']
			if(link!=null){	server.emit("item-clicked", link) }
			

		});
	};


	var nav; 

	return{
		init:init
	};

})();
