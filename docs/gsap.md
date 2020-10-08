#Animation

## LOTTIE + GSAP
https://github.com/airbnb/lottie-web
https://greensock.com/docs/v3/

### Activar en Viewport con GSAP


```javascript
contenedorAnimacion = document.querySelector('.contenedor');   

var anim = lottie.loadAnimation({
		container: contenedorAnimacion,
		renderer: 'svg',
		loop: false,
		autoplay: false,
        path: 'data.json',
});
    
ScrollTrigger.create({
     trigger: contenedorAnimacion,
     scrub: true,
     start: "botom center", 
     end: 'bottom top', 
     markers: true,
     onUpdate: self => {
         if(self.isActive){
            console.log("progress:", self),
            anim.setDirection(1);
            anim.play();
         }
         else{
            anim.setDirection(-1);
            // anim.goToAndStop(0, true)
            anim.play();
         }
     }
 });  
```
### Reproducir con SCROLL con GSAP

```javascript
// en un archivo ScrollLottie.js agregar: funcion scrollLottie de Chris Gannon
const ScrollLottie = (obj) => {
	let anim = lottie.loadAnimation({
	 container: document.querySelector(obj.target), 
	 renderer: 'svg',
	 loop: false,
	 autoplay: false,
	 path: obj.path 
   });
   
   let timeObj = {currentFrame: 0}
   let endString = (obj.speed === "slow") ? "+=2000" : (obj.speed === "medium") ? "+=1000" : (obj.speed === undefined) ? "+=1250" : "+=500";
   ScrollTrigger.create({
	 trigger: obj.target,
	   scrub: true,
	   pin: true,
	   start: "top top",
	   end: endString, 
	   onUpdate: self => {
		if(obj.duration) {
		 gsap.to(timeObj, {
		  duration: obj.duration,
		  currentFrame:(Math.floor(self.progress *  (anim.totalFrames - 1))),
		  onUpdate: () => {
		   anim.goToAndStop(timeObj.currentFrame, true)
		  },
		  ease: 'expo'
		 })
		} else {
		  anim.goToAndStop(self.progress *  (anim.totalFrames - 1), true)
		}
	   }
   });
  }
```
```javascript
// En el un script agregar. 
ScrollLottie({
	target: '.cosito',
	path: 'data.json', 
	duration: 1, 
	speed: 'fast' // "fast" | "medium" | "slow"
})

```

## Intersection Observer
Es una API nativa. Se puede usar para LAZZY LOAD. 
Es mucho menos versatil que ScrollTrigger de GSAP

```javascript
//no es muy versatil esta opción. 

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      console.log('rata tata');
    } else {
       console.log('barba parrilla');
    }
  });
}
const observer = new IntersectionObserver(handleIntersection);
observer.observe(target);
```

## GSAP 3

### from, to y fromTo

```javascript
	gsap.to('.circulo', {width: 100, opacity: 1, duration: 3}) // indicas a donde termina

	gsap.from('.cuadrado', {width: 0, duration: 3, ease: "elastic"}) // indicas el punto de arranque

	gsap.fromTo('.triangulo',{scale:0, x:100} ,{scale: 1.5, x:800, duration: 3}) // con principio y fin

	//now we can control it!
	tween.pause();
	tween.seek(2);
	tween.progress(0.5);
	tween.play();

```
#### Random
```javascript
x:"random(-100, 100, 5)" //chooses a random number between -100 and 100 for each target, rounding to the closest 5!
```


### Draggable
[foro](https://greensock.com/forums/topic/14575-how-to-create-a-sortable-list-with-draggable/)
[ejemplo grilla](https://codepen.io/osublake/pen/NrRJwm)
