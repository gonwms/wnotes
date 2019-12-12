# Math
## date
Recodar que mes es de 0 a 11, enero = 0

### format
```javascript
/**
* devuelve la fecha actual "DD.MM.YY.HH.MM.SS"
* */
function dateNow() {
	var d = new Date();
	return ("00" + d.getDate()).slice(-2) + "." +
		("00" + (d.getMonth() + 1)).slice(-2) + "." +
		d.getFullYear() + "." +
		("00" + d.getHours()).slice(-2) + "." +
		("00" + d.getMinutes()).slice(-2) + "." +
		("00" + d.getSeconds()).slice(-2

		);
}//-> 07.09.2019.09.48.52
```

###	Operaciones

#### fecha +1 
```javascript
function addOneDay(){
	var fecha ="11-5-2019"
	var splited = fecha.split("-").toString(); //--> "11,5,2019"
	var date = new Date(splited); //--> 
	date.setDate(date.getDate() + 1);
	return date.toISOString().substr(0, 10);
}
```

#### Tiempo entre 2 fechas
getTime() convierte una fecha en milisegundos desde 1970
new Date(YYYY,MM,DD) crea una fecha de ese día (el orden que se pone dia, mes y año puede variar segun plataforma)
```javascript
function fueHaceXDias(){
	var date = new Date(2019,12,5).getTime();  //new Date(2019,11,11) YYYY,MM,DD
	var hoy = Date.now();
	return Math.floor((hoy - date) / (60*60*24*1000))
}
fueHaceXDias()
```

### moment.js
Es un plugin para formatear fechas

```javascript
import moment from "moment";
import "moment/locale/es-us";
dateFormated() {
	return moment(this.date, "YYYY-MM-DD").format( "ddd, DD-MMM-YY"	);
}

```


## modulo
Es el resto de la divición. Sirve para determinar si es divisible sin decimales.
```javascript
(numero % 2 == 0) ? alert('es divisible') : alert('nop') 
```
## Negative to positive 
Devuelve valor absoluto.
```javascript
var num = Math.abs(-54) // 54
```
## min max
```javascript
Math.min(8, 32) //8
Math.max(8, 32) //32
```

## Range

### min max range
Mantiene el número dentro del rango
```javascript
var max = 10; var min = 5

Math.min(Math.max( 8, min), max)   // 8
Math.min(Math.max( 16, min), max)  // 10
Math.min(Math.max( 1, min), max)   // 5
```
### Random Range
```javascript
// random in range 
var getRandomInRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
  	return Math.random() * (max - min) + min;
}
getRandomInRange(1,10)
```

## Decimals

### ceil, floor & round

```javascript
//ceil redondea para arriba, floor para abajo
var numA = Math.ceil(5.4) // 6
var numB = Math.floor(5.4) // 5

//devuelven el entero más cercano 
var numC = Math.round(5.4) // 5
var numD = Math.round(5.6) // 6
```
### Math.trunc
elimina todo los decimales
```javascript
var num = Math.trunc(-54.75) // 54
```
### toFixed
provides n length **after the decimal** 
```javascript
var numA = 9.8794;
var numB = 8;

numA.toFixed(2), // 9.88
numB.toFixed(2) // 8.00

```

### toPrecision
provides number **total length**
```javascript
var numA = 9.8794;
var numB = 8;

numA.toPrecision(2), // 9.9
numB.toPrecision(2) // 8.0

```

## random
```javascript
Math.random()
```
