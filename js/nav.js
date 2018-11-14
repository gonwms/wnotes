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

					for (var [key,value] of data.lista) {
						var obj = data.lista[key]
						console.log(typeof obj)
						console.log(typeof obj)
						// 	console.log(item);
						// }
					}
					
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