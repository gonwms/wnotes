# strings

## JSON stringify

```javascript
var arr = [{ name:'Juan', number: 17.10 }, { name:'Guillermo', number: 25.05 } ]

var stgLine = JSON.stringify(arr) 
// [{"name":"Juan","number":17.1},{"name":"Guillermo","number":25.05}]

var stgTree = JSON.stringify(arr, null, 2) 
// [
// 	{
// 		"name": "Juan",
// 		"number": 17.1
// 	},
// 	{
// 		"name": "Guillermo",
// 		"number": 25.05
// 	}
// ]
	

```

