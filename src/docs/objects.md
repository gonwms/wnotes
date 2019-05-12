# Objects
## Prototypal Inheritance

- Every Object has a prototype. **Prototypal Inheritance**
- An Object is a **links list** to it's prototype. 
- If a key it's not defined in the object, it **lookup to his prototype**. Objects inherit directly from other objects.

## Trasversing Object

### Object.keys
devuelve un Array de los keys
```javascript
var obj = { id: '01', name: 'juan', category: 'trabajador' };
Object.keys(obj); // ['id', 'name', 'category']
```
### Object.getOwnPropertyNames
return un Array de los keys found directly in a given object. **excluye keys heredados de prototype**

```javascript 
var obj = { id: '01', name: 'juan', category: 'trabajador' };
var newObj = Object.create(obj)
newObj.color = 'rojo'
Object.getOwnPropertyNames(newObj); // [color]
```

### Object.value
devuelve un Array de los valores
```javascript
var obj = { id: '01', name: 'juan', category: 'trabajador' };
Object.value(obj); // ['01', 'juan', 'trabajador']
```

### Object.entries
devuelve un Array con Arrays de pares keys y value
```javascript
var obj = { id: '01', name: 'juan', category: 'trabajador' };
Object.entries(obj); // [["id", "01"],["name", "juan"], ["category", "trabajador"]]
```

## Creating and Cloning

### new vs Object.create
#### new
Constructor function + new
```javascript
function Person(name, job) {
  this.name = name;
  this.job = job;
}
var juan = new Person(juan, trabajador)
```
#### Object.create
allows you to **choose the prototype object without having to define a constructor function** .

```javascript
var pichu = {
	name      :'pichu',
	relacion  :'mejor amigo' ,
	ladrar    :function(){console.log('guau guau!!')},
	}

var firulais = Object.create(perro)
firulais.name = 'firulais'
firulais.ladrar() // console: guau guau!!
```

### copy with JSON Parse stringify
convierte el objeto en texto y luego en objeto nuevamente.
```javascript
let newObj = JSON.parse(JSON.stringify(obj));
```
### Object.assign
Copy the values of all enumerable own properties from one or more source objects to a target object.
```javascript
var perro = {
	name      :'pichu',
	relacion  :'mejor amigo' ,
	ladrar    :function(){console.log('guau guau!!')},
	}
	var firulais = Object.assign(pichu,firulais)

```

