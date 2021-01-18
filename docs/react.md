# Componenetes
## Funciones o Classes
Crear como función

```javascript
function HelloWorld(){
	return <h1>Hello</h1>
} 

function Container(){
	return (
		<div>
			Este es un mensaje para el mundo: <HelloWorld/>
		</div>
	)
}
```


Crear como class
```javascript
//imports
import React, {Component} from 'react';

class HelloWorld extends Component{
	render(){
		return (
			<h1>Hello</h1>
		)
	}
} 

class Container extends Component{
	render(){
		return (
		<div>
			Este es un mensaje para el mundo: <HelloWorld/>
		</div>
		)
	}
}
```

## Props
las props se pasan desde el parent (Container) hacia el componente

```javascript

function HelloWorld(props){
	return <h1>Hello {props.mensaje}</h1>
} 


function Container(){
	return (
		<div>
			Este es un mensaje para el mundo: <HelloWorld mensaje='wachines'/>
		</div>
	)
}
```