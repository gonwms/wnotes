// import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
var lottie = require('lottie-web');
var ltControl = require('./ltcontrol');
var log = ltControl.log;
var clickHandler = ltControl.clickHandler;

addEventListener('DOMContentLoaded', DOMContentLoadedFn);

function DOMContentLoadedFn() {
	log();
	var container = document.querySelector('BODY');
	// container.innerHTML = '<li>hola</li>';

	var animation = lottie.loadAnimation({
		container: container, // the dom element that will contain the animation
		renderer: 'svg',
		loop: false,
		autoplay: true,
		path: 'src/img/bluebar_anim.json', // the path to the animation json
		name: 'hola mundo',
	});

	// animation.addEventListener('enterFrame', ltControl.enterFrameHandler);
	// animation.addEventListener('data_ready', ltControl.dataReadyHandler);
	var direction = 1;
	container.addEventListener('click', clickHandler(animation));

}

