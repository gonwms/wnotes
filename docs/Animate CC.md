# Animate CC 

## Librerias

[createJS](https://www.createjs.com)  
[oCanvas](http://ocanvas.org/)

## global functions

para poder acceder a una función creada en en la linea de tiempo principal desde un children
Hay que atachar la funcion con `this.`

```javascript
// en root
this.myfunction = () => {
  /// ...
};

// en children
this.parent.myfunction();
```

### Tick Event (reversa mami)

```javascript
const _this = this;
_this.stop();

this.on('tick', tick);

function tick() {
  if (_this.currentFrame != 0) {
    console.log('TICK!!!');
    console.log(_this.currentFrame);
    _this.gotoAndStop(_this.currentFrame - 1);
  }
}
```

### zIndex

Para llevarlo arriba lo vuelve a pegar. hay 2 métodos,
_addChildAt(object, index)_ y _addChild(object)_

```javascript
element.parent.addChildAt(element, index);
element.parent.addChild(element);
```

### Visible / enable

```javascript
card.mouseEnabled = true;
card.visible = true;
```

### Cursor

```javascript
Element.cursor = 'pointer';
```
