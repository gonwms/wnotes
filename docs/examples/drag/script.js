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

	function dragAndDropAproach2() {

		
	


		var allZones = Array.from(document.querySelectorAll('.dropzone'));
		allZones.forEach((zone, index, arr) => {

			// zone.childNodes[0].style.top = zone.getBoundingClientRect().top + 'px'
			
			//dragstart
			zone.addEventListener('dragstart', function (e) {

				origin = {
					'el'    : arr[index],
					'index' : index,
					'top'   : arr[index].getBoundingClientRect().top,
					'child' : arr[index].childNodes[0]
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

				/*
					si o < t
						si item < t && item > o
							mover item 1 pos arriba

					si o > t
						si item > t y item < o
							mover item 1 pos abajo

				*/
					e.preventDefault();

					target = {
						'el'    : arr[ index],
						'index' : index,
						'top'   : arr[index].getBoundingClientRect().top,
						'child' : arr[index].childNodes[0]
					}
					// mueve item a la positión del original
					// origin.el.appendChild(target.child)
					// target.el.appendChild(origin.child)
					
					arr.forEach((el, i, list) => {
						if( i <= target.index){
								// el.style.background = 'red';
								el.childNodes[0].style.top = -el.getBoundingClientRect().height - 10 + 'px';
						}
					})
						
					
					// target.child.style.top = origin.top + 'px'
					// origin.child.style.top = target.top + 'px'

					document.addEventListener('transitionend', function(){	
						console.log('animationend');
					})

			});


			//dragleave
			zone.addEventListener('dragleave', function (e) {
				e.preventDefault();
				e.target.classList.remove('active_dropzone');

				document.addEventListener('animationend', function(){})
				
			});
		
			//drop
			zone.addEventListener('drop', function (e) {
				e.target.classList.remove('active_dropzone');
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
						// allZones.forEach((listOfZones,listOfIndex, arr)=>{
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