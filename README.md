## Page of the project
[click here](https://gon82.github.io/docs/)



---

&nbsp;

&nbsp;


# ARRAY METHODS

## Filter

filter 
- Creates a new array with all elements that pass the test implemented 
- var newArray = arr.filter(callback[, thisArg])
- NO modifica el array original
  
```javascript

function esPar(numeros){
   if(numeros%2 == 0){
       return true;
   }
  }
  console.log( "son pares: " + arr.filter(esPar))  //-> son pares: 2,4,6
  
  //-//

  function buscarPares(array){
   var listaDePares = array.filter(function(numeros){
       if (numeros%2 == 0){
           return true
       }
   })
   return listaDePares;
  }

  console.log(buscarPares(arr));   //-> [2, 4, 6]
  console.log(arr);  

```

## Map

map() 

    var new_array = arr.map(function callback(currentValue[, index[, array]]) {
        // Return element for new_array
    }[, thisArg])

- Creates a new array with the results of calling a provided function on every element in the calling array.
-   The map() method creates a new array with the results of calling a provided function on every element in the calling array.
-   The filter method doesn't do the same as the map method. The map method is used to convert each item of an array,
    while the filter method is used to select certain items of an array.  
-   No modifica array original

```javascript

   var arr = [1,2,3]
     
     function exclama(array){
       return array + "!";
    };
     
    var arrMapped= arr.map(exclama)
    console.log(arrMapped);       //-> ["1!", "2!", "3!"]
    console.log(arr);   	 //-> ["1", "2", "3"]

```

## Splice

splice() 

    array.splice(startIndex, deleteCount, item1, item2, ...)

Changes the contents of an array by removing existing elements and/or adding new elements.
- el segundo valor no es el index, es una cuenta desde el index
- SI modifica el array original


```javascript

    var arr = [0,1,2,3,4,5,6,7];

    arr.splice(1,4,"NO","SI") // return [1, 2, 3, 4] (elementos quitados)

    console.log(arr) // ["NO", "SI", 5, 6]

```

## Slice

slice() 
    
    arr.slice([startIndex, endIndex)

- Returns a portion of an array into a new array selected from begin to end (end not included)
- primer valor incluye el segundo está excluido
- NO modifica el array original

```javascript

    var arr = [0,1,2,3,4,5,6,7];
    arr.slice(2,5) // [2, 3, 4]

```

## Concat

concat() 

    var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

- Merge two or more arrays and returns a new array
- Los arrays originales no son afectados
- NO modifica el array original

```javascript

    var arr1 = ["3","2","1"]  
    var arr2 = ["si","no"]  
    var arr3 = ["hola", "chau"] 

    var arr4 = arr1.concat(arr2,arr3);
    console.log(arr4); //->  ["3", "2", "1", "si", "no", "hola", "chau"]

```

## Push

push()

    arr.push(element1[, ...[, elementN]])

- Adds one or more elements to the end of an array and returns the new length of the array
- SI modifica el array original

  
 
```javascript

    var arr = [1,2,3]
    arr.push("x") //-> 4    // returns the new length of the array
    console.log(arr); //-> [1,2,3,"x"]

```

## Reduce

reduce()
- Find is like filter, but instead returns just the one you are looking for 

```javascript 

    const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
    ];

    const comment = comments.find(comment => comment.id === 823423);

 ```

## Sort

Sort()
- Creates a new array with the results of calling a provided function on every element in the calling array. 

```javascript

   var arr = [ 40, 1, 5, 200 ];


    function comparar( a, b ){ 
        return a - b; 
    };

    arr.sort(comparar); // [1, 5, 40, 200]

```

## Some & Every

some() 
- at least one

every() 
- every


```javascript

    const people = [
        { name: 'Wes', year: 1988 },
        { name: 'Kait', year: 1986 },
        { name: 'Irv', year: 1970 },
        { name: 'Lux', year: 2015 },
    ];

    //     some;
    const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({isAdult});

    //     every
    const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({allAdults});

```

## Find

find() 
-  Find is like filter, but instead returns just the one you are looking for 
  
```javascript

    const comments = [
        { text: 'Love this!', id: 523423 },
        { text: 'Super good', id: 823423 },
        { text: 'You are the best', id: 2039842 },
        { text: 'Ramen is my fav food ever', id: 123523 },
        { text: 'Nice Nice Nice!', id: 542328 }
    ];

    const comment = comments.find(comment => comment.id === 823423)

```

## Call and Apply

call()
- method calls a function with a given this value and arguments provided individually
- provides a new value of this to the function/method. With call, you can write a method once and then inherit it in another object

apply()
- the fundamental difference is that call() accepts an argument list, while apply() accepts a single array of arguments.

```javascript

    function Product(name, price) {
    this.name = name;
    this.price = price;
    }

    function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
    }

    function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'toy';
    }

    var cheese = new Food('feta', 5);
    var fun = new Toy('robot', 40);

```

## Bind

bind()  
- crea una nueva función, que cuando es llamada, asigna a su operador  this el valor entregado
- el valor pasado es el this

```javascript

    this.x = 9;

    var module = {
        x: 81,
        getX: function() { return this.x; }
    };

    module.getX(); // 81

    var getX = module.getX;
    getX(); // 9, porque en este caso, "this" apunta al objeto global

    // Crear una nueva función con 'this' asociado al objeto original 'module'
    var boundGetX = getX.bind(module);
    boundGetX(); // 81

```

&nbsp;


&nbsp;



# DOM MANIPULATION


## Debouncing

1.  function debounce  
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

```javascript 
parrafo.style.cssText = 'display: block; position: absolute;' // para remplazar =
parrafo.style.cssText += 'display: block; position: absolute;' // para agregar +=

parrafo.style.color = 'red';
parrafo.classList.add('parrafo');
contenedor.classList.add('container');
contenedor.classList.remove('container');
contenedor.classList.toggle('active');

element.classList.contains('container'); // devuelve true si la contiene, false si no.
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
&nbsp;


&nbsp;

# AJAX REQUEST

[link](https://blog.garstasio.com/you-dont-need-jquery/ajax/#sending-and-receiving-json)


## GET
```javascript

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'myservice/username?id=some-unique-id');
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('User\'s name is ' + xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(); 

```


## POST
```javascript

    var newName = 'John Smith',
        xhr = new XMLHttpRequest();

    xhr.open('POST', 'myservice/username?id=some-unique-id');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseText !== newName) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeURI('name=' + newName));

```

## JSON
```javascript

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'myservice/user/1234');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var userInfo = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({
        name: 'John Smith',
        age: 34
    }));

```





