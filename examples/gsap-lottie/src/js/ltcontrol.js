
function dataReadyHandler(){
	// console.log('animation un frames:', animation.getDuration(true),'f', '-  animation in seconds:', animation.getDuration(false)+'s' )
	console.log('dataready');   
	// console.dir(animation);
	// console.dir(lottie);
}
function enterFrameHandler(data) {
//   console.log(data);
}

var direction = 1;
function clickHandler(){
	console.log('mandraca');
	direction = direction * -1;
	this.setDirection(direction);
	this.play();    
	
}

function print(){
	console.log('fucking printign');
}

export { 
	dataReadyHandler,
	enterFrameHandler,
	clickHandler,
	print,
};

// module.exports = {
// 	dataReadyHandler: dataReadyHandler,
// 	enterFrameHandler: enterFrameHandler,
// 	clickHandler: clickHandler,
// 	print:print,
// };