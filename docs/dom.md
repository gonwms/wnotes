# DOM MANIPULATION

## Debouncing

eventsListener como scroll que pueden consumir muchos recursos

```javascript
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// llamar a funcion como callback de debounce

function myfunction() {
  //function here
}

window.addEventListener('scroll', debounce(myfunction(), 300)); //300 es el argumento de tiempo, por defecto ahora es 20
```

## SVG links

1. Hacer los trazos en en illustrator y exportar como SVG, es importante que se exporte el doc del mismo tamaño que la imagen.
   Se puede exportar con imagen y después borrarla del svg y llamar al archivo externo.

2. Limpiar svg y dejarlo con un formato limpio.

3. para que funcionen los links hace falta siempre agregar xmlns:xlink="http://www.w3.org/1999/xlink"

Archivo.SVG

```
<figure id="IMG">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1155 1155" preserveAspectRatio="xMinYMin meet" >
<defs>
    <style>
    .piso{fill:red;
    opacity:0.5}
    </style>
</defs>
<image width="1155" height="1155" xlink:href="assets/img/edificio_selector.png"></image>
	<a xlink:href="www.google.com/images" target="_blank">
		<polygon id="piso_1" class="piso piso-1" points="544 0 884 112 884 223 544 161 230 356 230 293 544 0"/>
	</a>
	<a xlink:href="www.google.com" target="_blank">
		<polygon id="piso_2" class="piso piso-2" points="230 399 648 241 1003 308 1003 384 649 356 230 440 230 399"/>
	</a>
	</svg>
</figure>

```

js para agregarle estado activo al clickear

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var pisos = document.querySelectorAll('.piso');
  var active;
  pisos.forEach((piso, i) => {
    piso.addEventListener('click', function () {
      activar(i);
      active = i;
    });
  });
  function activar(index) {
    pisos.forEach((piso, i) => {
      if (index == i) {
        piso.classList.add('active');
      } else {
        piso.classList.remove('active');
      }
    });
  }
});
```

## URL Location

```javascript
location.protocol; //   https://
location.hostname; //   dominio.com
location.pathname; //   /servicios/diseño
location.hash; //   #formulario
location.href; //   https://dominio.com/servicios/diseño#formulario
window.location.search; // "?post=1234&action=edit"
```
get URL params
```javascript

https://laweb.com/?user_ID=2&user_email=gon.williams@gmail.com&user_alias=Gon

	let params = (new URL(document.location)).searchParams;
	const id = params.get('user_ID')
	const alias = params.get('user_alias')
	const email = params.get('user_email')

	const titulo = 	document.querySelector('.title h2')

	titulo.innerText = alias

```

## String to HTML

```javascript
var string = '<h1>Hello</h1><p>Your HTML Contents are visible now</p>';
var dom = document.createElement('div');
dom.innerHTML = str;
return dom;
```

## Mutation Observer

```javascript
/*definir target a obervar y las opciones*/
var targetNode = document.querySelector('#section6');
var options = {
  subtree: true, // ve los cambios de los hijos del target también
  attributes: true, // ve si hay cambios en los atributos
};
// función que se ejecuta
function callback(mutationsList) {
  // console.log(mutationsList)
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      // alert('Ch-ch-ch-changes!')
      gsap.fromTo('.swiper-slide-active .team-text', { y: 0 }, { y: -100, duration: 1 });
    }
  });
}
// crear nuevo mutationObserver

const mutationObserver = new MutationObserver(callback);
// ejecutarlo con los parametros definidos
mutationObserver.observe(targetNode, options);
```

## Selectors

### getElementsBy

```javascript
// getElementsBy
var a = document.getElementById('container');
var b = document.getElementsByTagName('DIV');
var c = document.getElementsByClassName('inner');
var d = document.querySelectorAll('.inner');

var e = document.querySelectorAll('[class^="con"]'); // todas las clases que empiezan con “con”
var f = document.querySelectorAll('[id^="con"]'); // todos los IDs que empiezan con “con”
var g = document.querySelectorAll('[rel^="js-"]'); // todos los elementos que tienen rel que empieza con “js-”
var h = document.querySelectorAll('[rel*="js-"]'); // todos los elementos que tienen rel que empieza con “js-” sirve si tienen 2 rel y js- es el segundo.
```

### elementFromPoint

returns the topmost Element at the specified coordinates (relative to the viewport).

```javascript
document.elementFromPoint(e.clientX, e.clientY);
```

### not

```javascript
var not = document.querySelector('.inner').closest(':not(.inner2)');
```

### attributes

```javascript
var data1 = document.querySelectorAll('.inner[data-nombre]');
var data2 = document.querySelectorAll('[data-nombre="numero3"]');
var alt = document.querySelector('img[alt]');
```

### dataset data-

Dataset attributes (standard para definidos por el usuario data

```html
<div id="electriccars" data-color="red" data-parent="cars" data-active>Tesla</div>
```

```javascript
var car =  document.querySelector('#electriccars')
// Get
car.dataset.color //-> red
car.dataset.parent //-> cars
if(dataset.active){
    ...
}
//Set
car.dataset.color  = 'green'
car.dataset.parent = 'transporte'
```

### get & set attributes & has

```javascript
// Get
alt.getAttribute('alt');
//Set
alt.setAttribute('alt', 'glegle');
//has
alt.hasAttribute('class');
```

### contains

```javascript
el.classList.contains('active');
```

### closets

Devuelve el ascendiente más cercano al elemento

```javascript
var closest = document.querySelector('IMG').closest('.inner');
```

### childNodes

```javascript
// childNodes
var divFirstChild = document.querySelector('DIV').childNodes[0]; // select first child Element
//firstChild & lastChild
var divFirstChild = document.querySelector('DIV').firstChild; // select first child Element
```

### match

devuelve el ascendiente más cercano al elemento

```javascript
var reg = /[\d]+\:/g;
var match = element.innerHTML.match(reg);
```

## Crear Insertar Elementos

### Crear Elemento

```javascript
var contenedor = document.createElement('DIV');
var parrafo = document.createElement('P');
```

### Contenido

```javascript
parrafo.textContent = 'esto es contenido texto'; // texto plano
parrafo.innerHTML = '<strong>esto es contenido enriquesido</strong>'; //texto HTML
parrafo.innerHTML = `string text ${expression} string text`; //template literal
```

## clonar Elemento
```javascript
var el2 = el1.cloneNode(true) // means copy al the children too.
el1.insertAdjacentElement('afterend', el2)
```

## wrap elements
```javascript
// WRAP ELEMENTS wrapElements('.selector-class', 'wrap-class')
function wrapElements(selector, myClass) {
  var element = document.querySelectorAll(selector);
  element.forEach((el) => {
    var wrapedElement = `<div class="${myClass}"><div class="${myClass}-inner">${el.outerHTML}</div></div>`;
    el.outerHTML = wrapedElement;
  });
}
wrapElements('.element', 'mask')

```
### Estilo y Clases

#### cssText

```javascript
parrafo.style.cssText = 'display: block; position: absolute;'; // para remplazar =
parrafo.style.cssText += 'display: block; position: absolute;'; // para agregar +=
```

#### set, add, remove, toggle

```javascript
parrafo.style.color = 'red';
parrafo.classList.add('parrafo');
contenedor.classList.remove('container');
contenedor.classList.toggle('active');
```

#### contains

```javascript
element.classList.contains('container'); // devuelve true si la contiene, false si no.
```

#### get computed style

```javascript
var elemento = document.queryselector('DIV');
window.getComputedStyle(elemento).position; //--> devuelve estilos de elemento párrafo
window.getComputedStyle(elemento).margin; // devuelve string ej: '10px'
```

#### remove propiedad inline

```javascript
element.style.removeProperty('margin');
```

### Insertar Node

#### appendChild & insertBefore

```javascript
//appendChild
contenedor.appendChild(parrafo);
body.appendChild(contenedor);

//insertBefore
contenedor.insertBefore(parrafo, contenedor.firstChild);
```

#### insertAdjacentElement

```javascript
//'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'

var wiki = document.querySelector('#wikiArticle');
wiki.insertAdjacentElement('afterbegin', parrafo);
```

#### insertAdjacentHTML

```javascript
//'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'

var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
// <div id="one">one</div>
// new structure is:
//<div id="one">one</div>
//<div id="two">two</div>
```

## posicionar

posicionar una elemento en Y

```javascript
el.getBoundingClientRect().top + window.scrollY;
```

obtener elemento con referencia a su contenerdor. posicion absoluta 0,0 del contenedor

```javascript
referencePoint.getBoundingClientRect().top + window.scrollY - (containerElement.getBoundingClientRect().top + window.scrollY) ;

Posicionar elemento y ajustarlo onResize
```

```javascript
//crear elemento
var frame = document.createElement('DIV');
//Elemento contenedor
var containerElement = document.querySelector('#containerElement');
// Elemento de referencia de posicion
var referencePoint = document.querySelector('#texto-header p');

// Estilos a nuevo Elementor
frame.style.cssText = `display: block; position:absolute; width: 1900px; border: 16px solid white; height: 600px;`;
frame.id = 'frame';

// Posicionar
function posFrame() {
  // calc posY
  // [[ el.getBoundingClientRect().top + window.scrollY ]] es la mejor forma de calcular el Y de un elemento.
  // Posición Y de LA REFERNCIA en toda página referencePoint.getBoundingClientRect().top + window.scrollY
  // Posición Y de DEL CONTENEDOR  en toda página (containerElement.getBoundingClientRect().top + window.scrollY)
  // calculo ambos porque voy a calcular el top de position absolute, es decir que tengo que partir desde 0,0 del contenedor.
  const posY =
    referencePoint.getBoundingClientRect().top +
    window.scrollY -
    (containerElement.getBoundingClientRect().top + window.scrollY);
  // calc posX
  const posX = referencePoint.getBoundingClientRect().x;

  // Aplico posición y agregos margenes
  frame.style.top = `${posY - 30}px`;
  frame.style.left = `${posX - 80}px`;
}

//'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
containerElement.insertAdjacentElement('afterbegin', frame);
posFrame();

// se ajusta on resize
window.addEventListener('resize', posFrame);
```

## Wrap Element with code

```javascript
function wrapElements(elemento) {
  var el = document.querySelectorAll(elemento);
  el.forEach((e) => {
    console.log(e);
    var nuevo = '<div class="mascara">' + e.innerHTML + '</div>';
    e.innerHTML = nuevo;
  });
}
wrapElements('.container img');
```

## Geometria

![](docs/imgs/geometry.png 'geometry')

### Position relative to the document

`element.getBoundingClientRect()` retrieve element position relative to the viewport.
`document.documentElement.scrollTop ` calculate the viewport offset.

The sum of the two will give the element position relative to the document:

```javascript
element.getBoundingClientRect().top + document.documentElement.scrollTop;
```

agregar un elemento en la posición de otro

```javascript
const elemento = document.querySelector('.elemento');
const body = document.querySelector('body');
let positionY = elemento.getBoundingClientRect().top + document.documentElement.scrollTop;
body.insertAdjacentHTML(
  'afterbegin',
  `<div style="position:absolute; top:${positionY}px; z-index:99" >--------------------------------</div>`
);
```

### element

```javascript
element.scrollHeight; // ENTIRE  content & padding (visible or not)
element.clientHeight; // VISIBLE content & padding
element.offsetHeight; // VISIBLE content & padding + border + scrollbar
```

### getBoundingClientRect

- method returns the size of an element and its position relative to the viewport.

```javascript
elemento.getBoundingClientRect()
DOMRect {x: 199, y: 191, width: 300, height: 108, top: 191, ...}

var width = elemento.getBoundingClientRect().width // 300
```

### getClientRects

Similiar a getBoundingClientRect

Toma elementos por separado, por ejemplo puede leer un SPAN dentro de un P, un Li dentro de un UL

```javascript
let p = document.querySelector('p');
let span = document.querySelector('span');

console.log(p.getClientRects().length);
console.log(span.getClientRects().length);
```

## Request Animation Frame

Call it once to kick it off, and your function recursively calls itself

```javascript
function repeatOften() {
  // Do whatever
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
```
