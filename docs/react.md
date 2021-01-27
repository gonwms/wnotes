#REACT

## Install

punto al final para que tome el folder en el que estamos.

```
$ npx create-react-app .
```

## Components

### Funciones o Classes

Crear como función

```javascript
function HelloWorld() {
  return <h1>Hello</h1>;
}

function Container() {
  return (
    <div>
      Este es un mensaje para el mundo: <HelloWorld />
    </div>
  );
}
```

Crear como class

```javascript
//imports
import React, { Component } from 'react';

class HelloWorld extends Component {
  render() {
    return <h1>Hello</h1>;
  }
}

class Container extends Component {
  render() {
    return (
      <div>
        Este es un mensaje para el mundo: <HelloWorld />
      </div>
    );
  }
}
```

## Props

Las props se pasan desde el parent (Container) hacia el componente

```javascript
function HelloWorld(props) {
  return <strong>Hello {props.mensaje}</strong>;
}

function Container() {
  return (
    <div>
      <p>
        Este es un mensaje: <HelloWorld mensaje="wachines" />
      </p>
      <p>
        Este es un mensaje: <HelloWorld mensaje="Wanchopes" />
      </p>
    </div>
  );
}
```

!!Cuando el componenete se definie con una Class, las **props** se llama con **this.props** y no es necesario agregarla como parámetro. Vienen dentro del **extends Componenet**

```javascript
//imports

import React, { Component } from 'react';

class HelloWorld extends Component {
  render() {
    return <h1>Hello {this.props.mensaje}</h1>;
  }
}

class Container extends Component {
  render() {
    return (
      <div>
        Este es un mensaje: <HelloWorld mensaje="mandrágora" />
      </div>
    );
  }
}
```

## State

```javascript
class Container extends Component {
  state = {
    visibility: true,
  };

  toggleVisible = () => {
    // 	this.setState({visibility : false})
    this.setState({ visibility: !this.state.visibility });
  };

  render() {
    if (this.state.visibility) {
      return (
        <div>
          <h1>Hello world</h1>
          <button onClick={this.toggleVisible}>Toggle</button>
        </div>
      );
    } else {
      return <button onClick={this.toggleVisible}>Toggle</button>;
    }
  }
}
```

## Hooks

### useStates

- Solo se pueden usar dentro comoponenetes de function, no de clases
- no pueden estar dentro if o funciones. tiene que se declarados al principio de la function.

```javascript
import React. {useState} from 'react'

function App(){
  return
}

```

### useContext

```javascript

```

### useRefs

### useReducer

### useMemo & useCallback

memo returns los valores. Callback retorna la función

### useEffect

Guardar en local storage

    ```javascript

    // el segundo argumento es la condición para que pase
    // si cambiar el array todo se activa y guarda en local

useEffect(() => {
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}, [todos]);
// el segundo argumento es la condición para que pase. No lo entiendo
//llama de local storage
useEffect(() => {
const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
if (localStorage) {
setTodos(storedTodos);
}
},[]);

    ```
