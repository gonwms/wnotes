# CSS

## mixins

### color clases

its not posible to create a variables sass, sólo variables css
crea classes css, pero no me hace feliz.

```css
$colors: (
  color-cyan: #08c7e1,
  color-blue: #237fea,
  color-green: #83bb10,
  color-orange: #ff7e54,
  color-darkgreen: #01120a,
  color-white: #ffffff,
  color-black: #000000,
);

$steps: 20; //--> result 3 lighter + 3 darker
$multiple: 2;

:root {
  // bright variations
  @each $key, $val in $colors {
    --#{$key}: #{$val};
    @if ($val != black and $val != white) {
      @for $i from 1 through $steps {
        @if ($i != $steps and $i % $multiple == 0) {
          --#{$key}-l#{calc(((($i - $multiple) / $multiple) + 1) * 100)}: #{mix(
              #fff,
              $val,
              calc($i * 100% / ($steps))
            )};
        }
      }
      @for $i from 1 through $steps {
        @if ($i != $steps and $i % $multiple == 0) {
          --#{$key}-d#{calc(((($i - $multiple )/ $multiple ) + 1) * 100)}: #{mix(
              #000,
              $val,
              calc($i * 100% / ($steps))
            )};
        }
      }
    }
  }
}
```

### breakeponits

```css
$breakpoints: (
  "sm": 767px,
  "md": 992px,
  "lg": 1200px,
  "xl": 1920px,
) !default;

@mixin up($breakpoint) {
  // If the key exists in the map
  @if map-has-key($breakpoints, $breakpoint) {
    // Prints a media query based on the value
    @media #{inspect((min-width: map-get($breakpoints, $breakpoint)))} {
      @content;
    }
  } @else {
    @error "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        + "Available breakpoints are: #{map-keys($breakpoints)}.";
  }
}

@mixin down($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media #{inspect((max-width: map-get($breakpoints, $breakpoint)))} {
      @content;
    }
  } @else {
    @warn "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        + "Available breakpoints are: #{map-keys($breakpoints)}.";
  }
}
```

## animation keyframe

```css
.mi_objeto {
  animation-name: my_animation;
  animation-duration: 12s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  /* animation-delay: 2s; */
}
@keyframes my_animation {
  0%,
  15% {
    transform: translateZ(-130px) rotateY(0deg);
  }
  25%,
  40% {
    transform: translateZ(-130px) rotateY(-180deg);
  }
  50%,
  90% {
    transform: translateZ(-130px) rotateX(-90deg);
  }
  100% {
    transform: translateZ(-130px) rotateX(90deg);
  }
}
```

## 3D

!! el elemento con **perspective** tiene que ser **padre directo** de los elementos desplazados en Z para lograr un efecto parallax

```html
<div class="container">
  <div class="cubo">
    <div class="red cara">red red red red red red red red</div>
    <div class="green cara">green green green green green</div>
    <div class="blue cara">blue blue blue blue blue blue blue</div>
    <div class="yellow cara">yellow yellow yellow yellow yellow</div>
  </div>
</div>
```

```css
.container {
  height: 100vh;
  background: #363636;
  perspective: 1200px;
  padding: 0;
  margin: 0;
}
.cubo {
  position: absolute;
  top: calc(50vh - 125px);
  left: calc(50vw - 125px);
  transform-style: preserve-3d;
  transform-origin: 125px 125px -125px; /* el ultimo valor es Z es la mitad de los -250px que mandé atrás a la cara de atrás */

  animation-name: rotacion_cuadrado;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes rotacion_cuadrado {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg) rotateX(0deg);
  }
}
.cara {
  width: 250px;
  height: 250px;
  position: absolute;
  opacity: 0.5;
  color: white;
  font-size: 50px;
  overflow: hidden;
  font-family: sans-serif;
}
.red {
  background: red;
  transform: rotateY(180deg) translateZ(250px);
}
.green {
  background: green;
  transform: rotateY(90deg);
  transform-origin: left;
}
.yellow {
  background: yellow;
  color: black;
}
.blue {
  background: blue;
  transform-origin: right;
  transform: rotateY(-90deg);
}
```

```


<style>
.container2{
	height: 400px;
	background: #363636;
	perspective: 1200px;
	padding: 0;
	margin:0
}


.cubo{
	height: 70px;
	width: 70px;
	position: absolute;
	top:calc(50vh - 125px);
	left:calc(50vw - 125px);
	transform-style: preserve-3d;
	transform-origin: 125px 125px -125px;  /* el ultimo valor es Z es la mitad de los -250px que mandé atrás a la cara de atrás */

		animation-name: rotacion_cuadrado;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
		animation-delay: 1s;
}
@keyframes rotacion_cuadrado {
	0% {transform:   rotateY(0deg);}
    100% {transform:  rotateY(360deg) rotateX(0deg);}
}

.cara{
	width: 250px;
	height: 250px;
	position: absolute;
	opacity: 0.5;
	color: white;
	font-size: 50px;
	overflow: hidden;
	font-family: sans-serif;
}

.red{ background: red; transform: rotateY(180deg) translateZ(250px);}
.green{ background: green; transform: rotateY(90deg); transform-origin: left;}
.yellow{ background: yellow; color: black;}
.blue{ background: blue; transform-origin: right; transform: rotateY(-90deg);}
</style>

<div class="container2">
	<div class="cubo">
		<div class="red cara">red red red red red red red red red red red red red redred red red red red red red</div>
		<div class="green cara">green green green green green green green green green green green green green green green green</div>
		<div class="blue cara">blue blue blue blue blue blue blue blue blue blue blue blue blue blue blue blue</div>
		<div class="yellow cara">yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow yellow</div>
	</div>
</div>

```

## Grid

### Explicit

- grid-template-columns
- grid-template-rows
- grid-template-areas

### Implicit

- grid-auto-columns
- grid-auto-rows

### Gaps

- grid-column-gap
- grid-row-gap
- grid-gap

### Positioning items in a grid

- grid-column
- grid-row

### Aligning things

- justify-content
- align-content
- justify-items
- align-items
- justify-self
- align-self

### align Justify CONTENT

- normal
- start
- end
- center
- stretch
- space-around
- space-between
- space-evenly
- baseline
- first baseline
- last baseline

### Align Justify ITEMS

- auto
- normal
- start
- end
- center
- stretch
- baseline
- first baseline
- last baseline

[click grid](wwww.wgon.tk/docs/grid/grid.html)
[ejemplo](https://github.com/gonwms/wnotes/blob/master/examples/grid/style.css)
