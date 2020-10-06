# Animation

##GSAP

USAR SERVIDOR LOCAL!

### install
#### CDN
```javascript

```
#### NPM
```
npm install gsap
```
```javascript
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
```

### TweenLite
```javascript
TweenLite.to(ELEMENT,SECONDS,{CSS})
TweenLite.to(container,1,{opacity:0, x:50})
```
### Draggable
[foro](https://greensock.com/forums/topic/14575-how-to-create-a-sortable-list-with-draggable/)
[ejemplo grilla](https://codepen.io/osublake/pen/NrRJwm)

```javascript

```


# GSAP 3

## from, to y fromTo

```javascript
	gsap.to('.element', {width: 100, opacity: 1, duration: 3}) // indicas a donde termina
	gsap.from('.element', {width: 0, duration: 3}) // indicas el punto de arranque
	gsap.fromTo('.element img',{scale:0, x:100} ,{scale: 1.5, x:800, duration: 3}) // 
```