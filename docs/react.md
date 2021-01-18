#REACT
## Componenetes
### Funciones o Classes
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

### Props
Las props se pasan desde el parent (Container) hacia el componente

```javascript

function HelloWorld(props){
	return <strong>Hello {props.mensaje}</strong>
} 

function Container(){
	return (
		<div>
			<p>Este es un mensaje:  <HelloWorld mensaje='wachines'/></p>
			<p>Este es un mensaje:  <HelloWorld mensaje='Wanchopes'/></p>
		</div>
	)
}
```
!!Cuando el componenete se definie con una Class, las `props` se llama con `this` y no es necesario agregarla como parámetro. Vienen dentro del extends Componenet
```javascript
//imports

import React, {Component} from 'react';

class HelloWorld extends Component{
	render(){
		return (
			<h1>Hello {this.props.mensaje}</h1>
		)
	}
} 

class Container extends Component{
	render(){
		return (
		<div>
			Este es un mensaje: <HelloWorld mensaje='mandrágora'/>
		</div>
		)
	}
}
```

### State

```javascript

class Container extends Component{

	state = {
		visibility:true
	}

	toggleVisible = () => {
		// 	this.setState({visibility : false})
			this.setState({visibility : !this.state.visibility})
	}

	render(){
		if(this.state.visibility){
			return (	
				<div>
					<h1>Hello world</h1>
					<button onClick={ this.toggleVisible}>Toggle</button>
				</div>
			)
			}
			else{
				return (
					<button onClick={ this.toggleVisible}>Toggle</button>
				)
			}
	}
}

```