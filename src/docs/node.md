# Node
## set proyect JSON
`npm init`

## install single package
```
npm install <package-name>
npm install <package-name> -D //instala as dev-dependencies
```

## Install All Dependencies
1. Complete the package.json with all dependencies and devDependencies.
1. then run   
`$ npm install`

## Update all dependencies
Simply change every dependency's version to *, then run update
```json
  "dependencies": {
    "gsap": "*",
    "webpack": "*",
    "underscore": "*"
  }
```
`$ npm update --save`

## exports & require

### Require
```javascript
var lottie = require('lottie-web'); // busca en la carpeta node_modules.
var myfunction = require('./myfunction'); // busca en la carpeta actual.
```

### Exports
```javascript
function sayHi(){  //....}
function sayBye(){  //....}

module.exports.sayHi = sayHi

module.exports = {
  sayHi: sayHi,
  sayBye: sayBye
}

```

## server
`http-server`

