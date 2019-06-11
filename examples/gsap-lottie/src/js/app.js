var lottie = require('lottie-web');
require ('../css/style.css');
// import '../css/style.css';
const { enterFrameHandler, dataReadyHandler, clickHandler } = require('./loose/ltcontrol');
// import { lottie } from 'lottie-web';
// import { TweenLite, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
var {TweenLite, CSSPlugin} =require('gsap/all');
// var gsap = require('gsap/all');
// import { enterFrameHandler, dataReadyHandler, clickHandler } from './loose/ltcontrol';

addEventListener('DOMContentLoaded', DOMContentLoadedFn);
function DOMContentLoadedFn() {
	
	/*LOTTIE*/ 
	
	var container = document.querySelector('BODY');
	var list = document.querySelector('UL');
	var animation = lottie.loadAnimation({
		container: container, // the dom element that will contain the animation
		renderer: 'svg',
		loop: false,
		autoplay: true,
		path: '/img/bluebar_anim.json', // the path to the animation json
		name: 'hola mundo',
	});
	var direction = 1;
	animation.addEventListener('enterFrame', enterFrameHandler);
	animation.addEventListener('data_ready', dataReadyHandler);
	container.addEventListener('click', clickHandler.bind(animation));


	/*GSAP*/
	// TweenLite.from(list,1,{opacity:0.0, x:80});
	// TweenLite.fromTO(list,1,{opacity:0.0, x:80,});

}

