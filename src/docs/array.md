
# ARRAY METHODS


## Filter

1. Creates a new array with all elements that pass the test implemented 
3. NO modifica el array original
2. var newArray = arr.filter(callback[, thisArg])

```javascript

    function buscarPares(array){

        var listaDePares = array.filter(function(numeros){
                if (numeros%2 == 0){ return true }
        })
        return listaDePares;
    }
    console.log(buscarPares(arr));   //-> [2, 4, 6]
 
```

## Map


```javascript
    var new_array = arr.map(function callback(currentValue[, index[, array]]) {
        // Return element for new_array
    }[, thisArg])
```

- Creates a new array with the results of calling a provided function on every element in the calling array.
- The map method is used to convert each item of an array.
- No modifica array original

```javascript
   var arr = [1,2,3]
     
     function exclama(array){
       return array + "!";
    };
     
    var arrMapped= arr.map(exclama)
    console.log(arrMapped);       //-> ["1!", "2!", "3!"]
    console.log(arr);   	 //-> ["1", "2", "3"]
```

##reduce
-The reduce() method reduces the array to a single value.

```javascript
    array.reduce(function(acumulate, currentValue, currentIndex, arr), initialValue)
```

```javascript
    var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    // sum is 6
```

## Splice

```javascript
    array.splice(startIndex, deleteCount, item1, item2, ...)
```
- Changes the contents of an array by removing existing elements and/or adding new elements.
- el segundo valor no es el index, es una cuenta desde el index
- SI modifica el array original


```javascript
    var arr = [0,1,2,3,4,5,6,7];
    arr.splice(1,4,"NO","SI") // return [1, 2, 3, 4] (elementos quitados)
    console.log(arr) // [0, "NO", "SI", 5, 6]
```

## Slice


```javascript  
arr.slice([startIndex, endIndex)
```

- Returns a portion of an array into a new array selected from begin to end (end not included)
- primer valor incluye el segundo está excluido
- NO modifica el array original

```javascript

    var arr = [0,1,2,3,4,5,6,7];
    arr.slice(2,5) // [2, 3, 4]

```

## Concat

```javascript
    var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```

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

- Adds one or more elements to the end of an array and returns the new length of the array
- SI modifica el array original

  
 
```javascript

    var arr = [1,2,3]
    arr.push("x") //-> 4    // returns the new length of the array
    console.log(arr); //-> [1,2,3,"x"]

```

## Find

- Find is like filter, but instead returns just the one you are looking for 

```javascript 
    const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
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

some - at least one
every - every

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

## Call and Apply

### Call
- method calls a function with a given this value and arguments provided individually
- provides a new value of this to the function/method. With call, you can write a method once and then inherit it in another object

### Apply
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
