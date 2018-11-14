var createDocumentsNav = (function (){

	function init(){

		var nav = document.querySelector('#header NAV')
		
		

		var xhr = new XMLHttpRequest();
			xhr.open('GET', 'docs/content.json',true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send();	
			xhr.onload = function () {

				if (xhr.status === 200){			
					data = JSON.parse(xhr.responseText);
					console.log(data.lista);
					data.lista.forEach(function(obj){
						// console.log(Object.keys(obj));
						// console.log(Object.values(obj));
						console.log(Object.entries(obj));
					});
					
						
				
					nav.innerHTML = 'la'
				}
				else{
					alert(xhr.status +': ' + 'No se encontró el archivo');
				}
			};

			
	}


	return{
		init:init,
	}
})()
var data