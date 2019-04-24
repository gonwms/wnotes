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


var origin = {};
var target = {};


// document.addEventListener('DOMContentLoaded', mouseEventsAproach)
document.addEventListener('DOMContentLoaded', dragAndDropAproach2)

//*:::::::::::::::::::::::::::::::::::::::::::: | DRAG & DROP  2 | :::::::::::::::::::::::::::::::::::::::::::*/
var allZones = Array.from(document.querySelectorAll('.dropzone'));
	function dragAndDropAproach2() {


		allZones.forEach((zone, index, arrayOfZones) => {
			
			//dragstart
			zone.addEventListener('dragstart', function (e) {

				origin = {
					'el'    : zone,
					'index' : index,
					'top'   : zone.getBoundingClientRect().top,
					'child' : zone.childNodes[0]
				}

				//all childs off target ar unselectionables
				document.body.classList.add('dragstart');
				
				// style dragen
				origin.child.classList.add('dragged');
				
				//hide original, keep only gosht
				window.requestAnimationFrame(function () {
					origin.child.style.visibility = 'hidden';
				});
				
			});

			// dragover:  se dispara cada  x segundos mientas dura el over.
			zone.addEventListener('dragover', function (e) {
					// prevent default to allow drop
					event.preventDefault();
					target.el.classList.add('active_dropzone');
			})

			// dragenter:  se dispara una sola vez al entrar.
			zone.addEventListener('dragenter', function (e) {
					e.preventDefault();

					target = {
						'el'    : zone,
						'index' : index,
						'top'   : zone.getBoundingClientRect().top,
						'base'  : zone.getBoundingClientRect().top - (zone.getBoundingClientRect().height),
						'child' : zone.childNodes[0]
					}

					arrayOfZones.forEach((el, i) => {

						var item = {
							'el'    : el,
							'index' : i,
							'top'   : el.getBoundingClientRect().top,
							'base'  : el.getBoundingClientRect().top - (el.getBoundingClientRect().height),
							'child' : el.childNodes[0],
							'height': el.getBoundingClientRect().height,
							'margin': parseInt(window.getComputedStyle(zone).marginBottom, 10)
						}
						item.child.innerText = 'index: ' +item.index
						if(origin.index < target.index){
							// if(i <= target.index && i >= origin.index){
							if(item.base <= target.top  && item.index > origin.index){		
								item.child.style.transform = `translateY(${-item.height - item.margin}px)`;
							}
						}
						else if(origin.index > target.index){
							// if(i <= target.index && i >= origin.index){
							if(item.top >= target.base  && item.index < origin.index){									
								item.child.style.transform = `translateY(${item.height + item.margin}px)`;
								
							}
						}	
					})
					// e.target.childNodes[0].addEventListener('transitionend', function(){	
						// console.log('animationend', e.target.id);
						// item.child.style.background = 'red'	
						// window.getComputedStyle(e.target)
						// e.target.childNodes[0].innerText = item.index
					// })

			});

			zone.addEventListener('dragleave', function (e) {
				e.preventDefault();
				e.target.classList.remove('active_dropzone');

				arrayOfZones.forEach((el, i) => {

						var item = {
							'el'    : el,
							'index' : i,
							'top'   : el.getBoundingClientRect().top,
							'child' : el.childNodes[0]
						}

						if(origin.index < target.index){
							if(item.top >= target.top){		
								item.child.style.transform = `translateY(0)`;

							}
						}
						else if(origin.index > target.index){
							if(item.top <= target.top){									
								item.child.style.transform = `translateY(0)`							
							}
						}	
					})
			});
		

			zone.addEventListener('drop', function (e) {
				e.target.classList.remove('active_dropzone');
				// console.log(origin.el);
				arrayOfZones.forEach((el, i) => {
					el.childNodes[0].style.transition = 'none'
					// el.childNodes[0].style.transform = `translateY(0)`
					el.childNodes[0].style.removeProperty('transform')
					// el.childNodes[0].addEventListener('transitionend', function(){	
					// 	el.childNodes[0].style.removeProperty('transform')
					// })
				})		

				if(origin.index < target.index){
					target.el.insertAdjacentElement('afterend', origin.el)
				}
				else{
					target.el.insertAdjacentElement('beforebegin', origin.el)
				}
			})
		

			zone.addEventListener('dragend', function (e) {
				e.preventDefault();		
				document.body.classList.remove('dragstart');
				e.target.classList.remove('dragged');		
				window.requestAnimationFrame(() => e.target.style.visibility = 'visible');
				arrayOfZones.forEach((el, i) => {
					el.childNodes[0].style.removeProperty('transition')
				})
				allZones = Array.from(document.querySelectorAll('.dropzone'));
				console.log(allZones);
			});
		});
		

	}//readyDOM -end

//*:::::::::::::::::::::::::::::::::::::::::::: | DRAG & DROP | :::::::::::::::::::::::::::::::::::::::::::*/

	function dragAndDropAproach() {

		var originItem;
		var targetItem;
		var originZonePosition;
		var targetZonePosition;
		var originZone;
		var targetZone;

		var allZones = Array.from(document.querySelectorAll('.dropzone'));
		allZones.forEach((zone, index) => {
			
			// console.log(zone.childNodes[0]);
			
			//dragstart
			zone.addEventListener('dragstart', function (e) {
				originZone = e.target.parentNode;
				originItem = e.target;
				originZonePosition = originItem.getBoundingClientRect().top;

				e.target.classList.add('dragged');
				document.body.classList.add('dragstart');

				//hide original, keep only gosht
				window.requestAnimationFrame(function () {
					e.target.style.visibility = 'hidden';
				});
			});

			// dragover:  se dispara cada  x segundos mientas dura el over.
			zone.addEventListener('dragover', function (e) {
					// prevent default to allow drop
					event.preventDefault();
					// console.log('over: ', e.target.id);
					targetZone = e.target;
					targetZonePosition = e.target.getBoundingClientRect().top;
					targetItem = targetZone.childNodes[0];
					targetZone.classList.add('active_dropzone');
		
					// mueve item a la positión del original
					if (targetItem) {
						//::custom velocity
						// var velocity = Math.abs(0.003*(originZonePosition - targetZonePosition)); 
						// targetItem.style.transition =  `transform ${velocity}s ease-in`;
						// console.log(index);					
						targetItem.style.transform = `translateY(${originZonePosition - targetZonePosition}px)`;
						// console.log(`transform ${Math.abs(0.3*(originZonePosition - targetZonePosition))}s ease`);				
					};	
						// allZones.forEach((listOfZones,listOfIndex, arrayOfZones)=>{
						// // console.log(arr.length-1);
						
						// if(listOfIndex <= index && listOfIndex-index > -1){
						// 	console.log('fisrt');
							
						// 	// console.log(listOfZones.firstElementChild);
						// 	listOfZones.firstElementChild.style.transform = `translateY(${-45}px)`;
						// }

					// })

						
			})

			// dragenter:  se dispara una sola vez al entrar.
			zone.addEventListener('dragenter', function (e) {
				e.preventDefault();
			});

			//dragleave
			zone.addEventListener('dragleave', function (e) {
				e.preventDefault();
				// console.log('leave: ', e.target.id);

				if (targetItem) {
					targetItem.style.transform = ` translateY(0px)`;
				}
				e.target.classList.remove('active_dropzone');

				// originZonePosition =  targetZonePosition
				// originZone = targetZone
				//::::::SWITCH NODES
				// originZone.appendChild(targetItem)
				// targetZone.appendChild(originItem)

			});
		
			//drop
			zone.addEventListener('drop', function (e) {
				if (targetItem) {
					targetItem.style.transform = ` translateY(0px)`;
				}
				e.target.classList.remove('active_dropzone');

				//::::::SWITCH NODES
				// originZone = targetZone
				// originZonePosition =  targetZonePosition
				originZone.appendChild(targetItem)
				targetZone.appendChild(originItem)
			})
			
			// dragend
			zone.addEventListener('dragend', function (e) {
				e.preventDefault();
				document.body.classList.remove('dragstart');
				e.target.classList.remove('dragged');
				
				window.requestAnimationFrame(function () {
					e.target.style.visibility = 'visible';
				});
		
			});
		});
		

	}//readyDOM -end


//*:::::::::::::::::::::::::::::::::::::::::::: | MOUSE APROACH | :::::::::::::::::::::::::::::::::::::::::::*/

	function mouseEventsAproach() {

		var itemList = Array.from(document.querySelectorAll('.item'))
		itemList.forEach((item) => {
			var clickOrigin = []
			//dragstart
			item.addEventListener('mousedown', function (e) {
				console.log('mousedown', item.innerText);
				item.classList.add('dragged')
				clickOrigin = [
					e.clientX - item.getBoundingClientRect().left,
					e.clientY - item.getBoundingClientRect().top
				]
			});

			//drag move
			document.addEventListener('mousemove', debounce(function (e) {
				if (item.classList.contains('dragged')) {

					console.log(e.clientY, item.offsetTop);

					//Y axis
					var _X = e.clientX - clickOrigin[0] - item.offsetLeft
					var _Y = e.clientY - clickOrigin[1] - item.offsetTop
					item.style.transform = `translate(${_X}px,${_Y}px)`;

				}
			}));

			//drag relase
			document.addEventListener('mouseup', function () {
				console.log('mouseup', item.innerText);
				item.classList.remove('dragged')
			});

		});

	}