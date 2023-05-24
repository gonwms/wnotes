#Animation
## CheatSheet Gsap

https://greensock.com/cheatsheet/


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
Es mucho menos versatil que ScrollTrigger de GSAP

### Lazzy loadAnimation
```html
<!--la url debe estar en data-src-->
<img data-src="https://images.jps" class="lazyload"/>
```
```javascript
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.classList.add(‘loaded’)
      observer.unobserve(entry.target);
    }
  });
}
```
### Menu animado fijo on scroll
```html
    <div id="menu-big"></div>
    <div id="menu-little" style="background: #d6d6d6; position:fixed;top:-100px;z-indez:1,width: 100%;" ></div>
```
```css
#menu-little.activo{
	top:0px;
	z-index: 99;
}
```
```javascript
	var menuLitte = document.querySelector('#menu-little');
	const target = document.querySelector('#menu-big');
	function handleIntersection(entries) {
		entries.map((entry) => {
			// console.log(entry);
			// si menu big es intersecting -> 
		  if (entry.isIntersecting) {
			  menuLitte.classList.remove('activo');
			} else {
				menuLitte.classList.add('activo');
		  }
		});
	  }
	//   .to('.menu',{y:-30, duration:0.3 },'0')
	const observer = new IntersectionObserver(handleIntersection);
	observer.observe(target);
}
```
# TIMELINE CONTROL
```javascript
document.addEventListener("DOMContentLoaded", ready);
function ready(){
	
  const btn1 = document.querySelector('#btn1')
  const btn2 = document.querySelector('#btn2')
	const btn3 = document.querySelector('#btn3')
	
  btn1.addEventListener('click', function(){
    tl.play()
  })
  btn2.addEventListener('click', function(){
    tl.reverse()
  })
  btn3.addEventListener('click', function(){
    tl.play('lobueno')
  })

  const tl = gsap.timeline({paused:true})
  .to('h1',{y:200})
	.addPause()
	.addLabel('lobueno')
	.to('h1',{css:{color:"red"}})
  
}
```
```html
<body>
  <h1>CASACA</h1>
</body>

<div>
  <a id="btn1">play</a>
  <a id="btn2">reverse</a>
	<a id="btn3">goto and play</a>
</div>
```



## GSAP 3

### timeline
```javascript
animateIn.to([TARGET],{
	scaleX:0,
	y:500
}, [POSITION EN LA LINEA DE TIEMPO]);
```
#### Animar elementos en secciones.

animar los elementos dentro de modulos iguales (secciones).
Lo importante es que cada elemento


```javascript

// //HIDDEN TEXT ANIMATION
function AnimarElementosEnSecciones(){
var ElementorSection = document.querySelectorAll('.elementor-section');
	ElementorSection.forEach(function(ElemetorS) {
		//ELEMENTOS
		var hiddenText = Array.from(ElemetorS.querySelectorAll('.hiddentext SPAN'));
		var parrafo = Array.from(ElemetorS.querySelectorAll('P'));
		var overlay = Array.from(ElemetorS.querySelectorAll('.overlay'));
		var origin = "top left";

		//TRIGGER 
		var animateIn = gsap.timeline({
			scrollTrigger: {
				trigger: ElemetorS,
				start: 'top center',
				end:'top end',
				// markers: 'true',
				toggleActions: 'play none none reverse',
			}
		});
		// ANIMACIONES
		animateIn.fromTo(hiddenText,{
			y:100
		}, {
			y:0,
			stagger:0.1,
			duration:1,
			ease:Expo.easeOut
		}, 0);
		animateIn.from(parrafo,{
			display:'block',
			x:50,
			opacity:0,
			stagger:0.1,
			duration:0.5,
		}, 0);
	// ANIMACION CON UN CONDICIONAL
		animateIn.to(overlay,{
			scaleX:0,
			duration:1,
			transformOrigin: () =>{
				console.log(overlay)
				if(overlay[0].classList.contains('overlay_2')){
					return "bottom left";
				}else{
					return "bottom right";
				}
			}
		}, 0);
	});
}

```

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
