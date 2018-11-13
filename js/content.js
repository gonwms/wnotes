'use strict'

console.log(files);

//desplumar html para que funcione con highlight.js
var htmlPluck = (function(){

	function init(){

		  var htmlCode = Array.from(document.querySelectorAll('.html'))
		  
		  htmlCode.forEach( function(code){
			var str = code.innerHTML
			code.innerHTML = htmlEntities(str)
		  });
	}

	function htmlEntities(str) {
		  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	return{
		  init:init
	}
	
})()



// TODO


//function load json

// json
// {
// 	"DOM":{
// 		"name": 'name',
// 		"contentUrl": "/docs/file.html",
// 		"imgURL": "/docs/file.jpg",
// 	}
// 	"array":{
// 		"name": 'name',
// 		"contentUrl": "/docs/file.html",
// 		"imgURL": "/docs/file.jpg",
// 	}
// 	"functional":{
// 		"name": 'name',
// 		"contentUrl": "/docs/file.html",
// 		"imgURL": "/docs/file.jpg",
// 	}
// }
