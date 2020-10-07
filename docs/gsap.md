# Animation

# Intersection Observer

```javascript
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

## Lottie

https://github.com/airbnb/lottie-web

##GSAP
### Draggable
[foro](https://greensock.com/forums/topic/14575-how-to-create-a-sortable-list-with-draggable/)
[ejemplo grilla](https://codepen.io/osublake/pen/NrRJwm)



# GSAP 3
## from, to y fromTo

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