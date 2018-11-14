'use strict'

//desplumar html para que funcione con highlight.js
var htmlPluck = (function () {

	function init() {
			var content = document.querySelector('.content')
			var htmlCode = Array.from(content.querySelectorAll('.html'))

		htmlCode.forEach(function (code) {
			var str = code.innerHTML
			code.innerHTML = htmlEntities(str)
		});
	}

	function htmlEntities(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	return {
		init: init
	}

})()

var loadContent = (function () {

	function init() {
		content = document.querySelector('.content')
		request(content)
	}

	function request(place) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'docs/doc2.html');
		xhr.onload = function () {
			if (xhr.status === 200) {

				place.innerHTML = xhr.responseText;
				htmlPluck.init()
				hljs.initHighlighting()
				makeTree()

			} else {
				alert('fallo la carga che' + xhr.status);
			}
		};
		xhr.send();	



	}
	var content; 

	return{
		init:init
	}


})()

var makeTree = function(){
	var content = document.querySelector('.content')
	var tree = document.querySelector('.tree')
	var h2 = Array.from(content.querySelectorAll('H2'))
	console.log(h2);
	h2.forEach(function(){
		//
	})
}

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