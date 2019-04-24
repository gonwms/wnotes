# DOM MANIPULATION

![](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "asd")
[click aqui](https://www.mozilla.org)
## Debouncing

1.  function debounce  
eventsListener como `scroll que pueden consumir muchos` recursos

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

* * *

## Selectors

HTML REFERENCE 
```HTML

<div id="container">
    <div class="inner1 inner" data-nombre="numero1">interno-1</div>
    <div class="inner2 inner">interno-2</div>
    <div class="inner3 inner" data-nombre="numero3"><img src="#" alt="google">    </div>  
</div>  

 ```

### getElementsBy

```javascript

    // getElementsBy
    var contenerdor = document.getElementById('container')
    var divs = document.getElementsByTagName('DIV')
    var inner3 = document.getElementsByClassName('inner')
    var inners = document.querySelectorAll('.inner')

    var test = document.querySelectorAll('[class^="con"]') // todas las clases que empiezan con “con”
    var test = document.querySelectorAll('[id^="con"]') // todos los IDs que empiezan con “con”
    var test = document.querySelectorAll('[rel^="js-"]') // todos los elementos que tienen rel que empieza con “js-”
    var test = document.querySelectorAll('[rel*="js-"]') // todos los elementos que tienen rel que empieza con “js-” sirve si tienen 2 rel y js- es el segundo. 

```

### NOT

:not()

```javascript
    // not
    var not =document.querySelector('.inner').closest(":not(.inner2)");
```

### Attributes

```javascript 
    var conData = document.querySelectorAll('.inner[data-nombre]')
    var conData3 = document.querySelectorAll('[data-nombre="numero3"]')
    var alt = document.querySelector('img[alt]')
```

### Get & Set attributes

```javascript 
    // Get & Set attributes
    // Get
    alt.getAttribute('alt')
    //Set
    alt.setAttribute('alt','glegle')
```

### Dataset attributes
- Dataset attributes (standard para definidos por el usuario data
  
```javascript
 // Get
 document.querySelector('.inner2').dataset.nombre
 
 //Set
 document.querySelector('.inner').dataset.nombre='Ramón Castillo'
 ```

### Closets

closest() 
- devuelve el ascendiente más cercano al elemento 

```javascript
    var closest = document.querySelector('IMG').closest('.inner')
```

### match()

- devuelve el ascendiente más cercano al elemento 
  
```javascript
// match()
var reg = /[\d]+\:/g;  
var match = element.innerHTML.match(reg)
```

&nbsp;

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
#### get contains
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

### getBoundingClientRect

getBoundingClientRect() 
- method returns the size of an element and its position relative to the viewport. 
```javascript
elemento.getBoundingClientRect()
DOMRect {x: 199, y: 191, width: 300, height: 108, top: 191, ...}

var width = elemento.getBoundingClientRect().width // 300
```

### Range.getBoundingClientRect

  Range.getBoundingClientRect() 
- Experimental, permite unir elementos en un rango???? investigar. 
```javascript

elemento.getBoundingClientRect() DOMRect {x: 199, y: 191, width: 300, height: 108, top: 191, …}

 ```

### getClientRects

getClientRects() 
- Similiar a getBoundingClientRect
- Toma elementos por separado, por ejemplo un, lo tomaría todo junto sin poder analizar el span por separado. Los li ul 
  
```javascript

elemento.getBoundingClientRect() DOMRect {x: 199, y: 191, width: 300, height: 108, top: 191, …} 

```