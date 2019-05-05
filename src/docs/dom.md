# DOM MANIPULATION

## Debouncing

eventsListener como scroll que pueden consumir muchos recursos

```javascript 
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// llamar a funcion como callback de debounce

function myfunction() {
    //function here
}

window.addEventListener('scroll', debounce(myfunction(), 300)); //300 es el argumento de tiempo, por defecto ahora es 20
```


## Selectors
### getElementsBy

```javascript
// getElementsBy
var a = document.getElementById('container')
var b = document.getElementsByTagName('DIV')
var c = document.getElementsByClassName('inner')
var d = document.querySelectorAll('.inner')

var e = document.querySelectorAll('[class^="con"]') // todas las clases que empiezan con “con”
var f = document.querySelectorAll('[id^="con"]') // todos los IDs que empiezan con “con”
var g = document.querySelectorAll('[rel^="js-"]') // todos los elementos que tienen rel que empieza con “js-”
var h = document.querySelectorAll('[rel*="js-"]') // todos los elementos que tienen rel que empieza con “js-” sirve si tienen 2 rel y js- es el segundo. 
```
### elementFromPoint
returns the topmost Element at the specified coordinates (relative to the viewport).
```javascript
document.elementFromPoint(e.clientX,e.clientY)
```
### not

```javascript
var not =document.querySelector('.inner').closest(":not(.inner2)");
```

### attributes

```javascript 
var data1 = document.querySelectorAll('.inner[data-nombre]')
var data2 = document.querySelectorAll('[data-nombre="numero3"]')
var alt = document.querySelector('img[alt]')
```

### get & set attributes

```javascript 
// Get
alt.getAttribute('alt')
//Set
alt.setAttribute('alt','glegle')
```

### dataset attributes
Dataset attributes (standard para definidos por el usuario data
  
```javascript
 // Get
 document.querySelector('.inner2').dataset.nombre
  //Set
 document.querySelector('.inner').dataset.nombre='Ramón Castillo'
 ```

### closets

Devuelve el ascendiente más cercano al elemento 

```javascript
var closest = document.querySelector('IMG').closest('.inner')
```

### match

devuelve el ascendiente más cercano al elemento 
  
```javascript
var reg = /[\d]+\:/g;  
var match = element.innerHTML.match(reg)
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
parrafo.innerHTML = '<strong>esto es contenido enriquesido</strong>' //texto HTML
parrafo.innerHTML = `string text ${expression} string text` //template literal
```

### Estilo y Clases


#### cssText

```javascript 
parrafo.style.cssText = 'display: block; position: absolute;' // para remplazar =
parrafo.style.cssText += 'display: block; position: absolute;' // para agregar +=
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
var elemento = document.queryselector('DIV')
window.getComputedStyle(elemento).position //--> devuelve estilos de elemento párrafo
window.getComputedStyle(elemento).margin // devuelve string ej: '10px'
```

#### remove propiedad inline

```javascript
element.style.removeProperty('margin')
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

var wiki = document.querySelector('#wikiArticle')
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

## Geometria

![](src/docs/imgs/geometry.png "geometry")

```javascript
element.scrollHeight // ENTIRE  content & padding (visible or not)
element.clientHeight // VISIBLE content & padding
element.offsetHeight // VISIBLE content & padding + border + scrollbar
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

```javascript

```