'use strict';


function debounce(func, wait = 0, immediate = true) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};





//*:::::::::::::::::::::::::::::::::::::::::::: | DRAG & DROP  2 | :::::::::::::::::::::::::::::::::::::::::::*/
document.addEventListener('DOMContentLoaded', () => {
	
	dragAndDropAproach.init()
	// mouseEventsAproach()
})

var dragAndDropAproach = (function () {
	//global var
	var origin;	var target;	var arr =[]; var nodes; var count = 0;
	
	//dragListeners
	// var dragStartHandler;  var dragOverHandler;  var dragEnterHandler;  var dragLeaveHandler;  var dropHandler;  var dragEndHandler;  


	function init(){
		nodes = document.querySelectorAll('.dropzone')
		
		handlerEvents()
		
		// console.log('NEW-----------------------');
		// console.table(allZones,'id');	
	}
	



	function handlerEvents(){

		// metodo para pasar parametros en una callback function
		console.log(count);
		Array.from(nodes).forEach((zone, index, arr) => {

			function dragStartHandler (evt){ onDragStart (zone, index, arr, evt) }
			function dragOverHandler  (evt){ onDragOver  (zone, index, arr, evt) }
			function dragEnterHandler (evt){ onDragEnter (zone, index, arr, evt) }
			function dragLeaveHandler (evt){ onDragLeave (zone, index, arr, evt) }
			function dropHandler      (evt){ onDrop      (zone, index, arr, evt) }
			function dragEndHandler   (evt){ onDragEnd   (zone, index, arr, evt) }
			//remove
			
			if (count > 0){
				zone.removeEventListener('dragstart' ,	dragStartHandler ,false)
				zone.removeEventListener('dragover'  ,	dragOverHandler  ,false)
				zone.removeEventListener('dragenter' ,	dragEnterHandler ,false)
				zone.removeEventListener('dragleave' ,	dragLeaveHandler ,false)
				zone.removeEventListener('drop'      ,	dropHandler      ,false)
				zone.removeEventListener('dragend'   ,	dragEndHandler   ,false)
			}

			//add
			zone.addEventListener( 'dragstart' , dragStartHandler	,false)
			zone.addEventListener( 'dragover'  , dragOverHandler 	,false)
			zone.addEventListener( 'dragenter' , dragEnterHandler	,false)
			zone.addEventListener( 'dragleave' , dragLeaveHandler	,false)
			zone.addEventListener( 'drop'      , dropHandler 	 	,false)
			zone.addEventListener( 'dragend'   , dragEndHandler  	,false)
		

			
		})
		count ++
		
		
	}

	function removeHandlerEvents(){

		Array.from(nodes).forEach((zone, index, arr) => {
			///...		
		})
	}


	var onDragStart = function (zone, index, arr , evt) {

			console.table(arr,'id');
			origin =  new ZoneParameters(zone, index) 
			//all childs off target are unselectionables
			document.body.classList.add('dragstart');
			// style dragen
			origin.child.classList.add('dragged');
			//hide original, keep only gosht
			window.requestAnimationFrame(function () {
				origin.child.style.visibility = 'hidden';
			});			
	};

	var onDragOver = function (zone, index, arr,evt) {			
			evt.preventDefault();// prevent default to allow drop
	}
		
	var onDragEnter = function (zone, index, arr ,evt) {
		evt.preventDefault();
		target =  new ZoneParameters(zone, index) 
		target.el.classList.add('active_dropzone');

		arr.forEach((el, i) => {
			var item =  new ZoneParameters(el, i) 

			if(origin.index < target.index)
			{
				if(item.base <= target.top  && item.index > origin.index){		
					item.child.style.transform = `translateY(${-item.height - item.margin}px)`;
					// [ arr[origin.index], arr[target.index] ] = [ arr[target.index], arr[origin.index] ];

				}
			}
			else
			{
				if(item.top >= target.base  && item.index < origin.index){									
					item.child.style.transform = `translateY(${item.height + item.margin}px)`;
				}
			}	
		})
	};

	var onDragLeave = function(zone, index, arr,evt) {
		evt.preventDefault();
		evt.target.classList.remove('active_dropzone');

		arr.forEach((el, i) => {
				var item = new ZoneParameters(zone, index) 
				item.child.style.transform = `translateY(0)`;		
		})
	};


	var onDrop = function(zone, index, arr, evt) {
		evt.target.classList.remove('active_dropzone');
		arr.map((el, i) => {
			el.childNodes[0].style.transition = 'none'
			el.childNodes[0].style.removeProperty('transform')
		})		
		if(origin.index < target.index){
			target.el.insertAdjacentElement('afterend', origin.el)


		}
		else{
			 target.el.insertAdjacentElement('beforebegin', origin.el)
		} 

	};

	var onDragEnd = function(zone, index, arr, evt) {
		evt.preventDefault();		
		document.body.classList.remove('dragstart');
		origin.el.classList.remove('dragged');		
		//unhide original dragged item
		window.requestAnimationFrame(() => evt.target.style.visibility = 'visible');
		arr.forEach((el, i) => {
			el.childNodes[0].style.removeProperty('transition')
		})



		removeHandlerEvents()
		handlerEvents()
		// init()
		nodes = document.querySelectorAll('.dropzone')
		arr = Array.from(nodes)


		console.log('fin')
		// console.table(arr,'id');

	}

	function logZones(){
		console.log(allZones);
	}

	function ZoneParameters (zone, index, el ) {
		this.el     = zone;
		this.index  = index;
		this.top    = zone.getBoundingClientRect().top;
		this.base   = zone.getBoundingClientRect().top - (zone.getBoundingClientRect().height);
		this.child  = zone.childNodes[0];
		this.height = zone.getBoundingClientRect().height;
		this.margin = parseInt(window.getComputedStyle(zone).marginBottom, 10)
	}

	return{
		init:init,
		logZones:logZones
	}

})()



//*:::::::::::::::::::::::::::::::::::::::::::: | MOUSE APROACH | :::::::::::::::::::::::::::::::::::::::::::*/

	// function mouseEventsAproach() {

	// 	var itemList = Array.from(document.querySelectorAll('.item'))
	// 	itemList.forEach((item) => {

	// 		item.setAttribute('draggable', "false")

	// 		var clickOrigin = []
	// 		//dragstart
	// 		item.addEventListener('mousedown', function (e) {
	// 			console.log('mousedown', item.innerText);
	// 			item.classList.add('dragged')
	// 			item.setAttribute('transition', "none")
	// 			clickOrigin = [
	// 				e.clientX - item.getBoundingClientRect().left,
	// 				e.clientY - item.getBoundingClientRect().top
	// 			]
	// 		});

	// 		//drag move
	// 		document.addEventListener('mousemove', debounce(function (e) {
	// 			if (item.classList.contains('dragged')) {

	// 				// console.log(e.clientY, item.offsetTop);

	// 				//Y axis
	// 				var _X = e.clientX - clickOrigin[0] - item.offsetLeft
	// 				var _Y = e.clientY - clickOrigin[1] - item.offsetTop
	// 				item.style.transform = `translate(${_X}px,${_Y}px)`;

	// 			}
	// 		}));

	// 		//drag relase
	// 		document.addEventListener('mouseup', function () {
	// 			console.log('mouseup', item.innerText);
	// 			item.classList.remove('dragged')
	// 		});

	// 	});

	// }