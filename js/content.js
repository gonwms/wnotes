'use strict'
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

