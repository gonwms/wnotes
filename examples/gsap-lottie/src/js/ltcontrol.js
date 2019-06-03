function dataReadyHandler(animation){
	// console.log('animation un frames:', animation.getDuration(true),'f',      '-  animation in seconds:', animation.getDuration(false)+'s' )
	console.log('dataready');   
	console.dir(animation);
	console.dir(lottie);
}
function enterFrameHandler(data) {
//   console.log(data);
}

function clickHandler(animation){
	direction = direction * -1;
	animation.setDirection(direction);
	animation.play();     
}
function log(){
	console.log('lalali');
}

module.exports = {
	// dataReadyHandler: dataReadyHandler,
	// enterFrameHandler: enterFrameHandler,
	clickHandler: clickHandler,
	log:log
};