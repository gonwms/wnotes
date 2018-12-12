'use strict'

let server = new EventEmitter2();

let contentList;  

(function loadcontentList(){

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'content.json',true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();	
	xhr.onload = () => {
		if (xhr.status === 200){			
			
			contentList = JSON.parse(xhr.responseText);
				// console.log(Array.isArray(data.lista));
			server.emit('List-Loaded', contentList)
			return contentList
		}
		else{
			console.error(xhr.status +': ' + 'No se encotraron documentos');
		}
	};



})()


document.addEventListener('DOMContentLoaded', function () {
	
	mainNav.init();
	loadDocuments.init();
	htmlPluck.init();

	

})


