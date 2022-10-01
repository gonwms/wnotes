# Node

## Crear directorios | JSON to Folder

`
obj.json
[
{
"name": "carpeta",
"files": [
{
"name": "subcarpeta",
"files": ["file1.json", "readme.md"]
},
{
"name": "subcarpeta2"
}
]
}
]

` `
npx json-to-folder create -j="C:\Users\Gonzalo\Desktop\TESTNODE\obj.json"
`

## list of globally installed packages

`npm list -g --depth 0`

## set proyect JSON

`npm init`

## install single package

```
npm install <package-name>
npm install <package-name> -D //instala as dev-dependencies
```

## Install All Dependencies

Complete the package.json with all dependencies and devDependencies. then:
`$ npm install`

## Unistall all unused depencies

`$ npm prune`
`$ npm prune --production`

## Update all dependencies

Simply change every dependency's version to \*, then run update

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

// destructing
const { enterFrameHandler, dataReadyHandler, clickHandler } = require('./ltcontrol');
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

## import & export

### import

```javascript
import { loadAnimation } from 'lottie-web';
import { myfunction1, myfunction2, myfunction3 } from './myscript';
```

### Exports

```javascript
function myfunction1(){  //....}
function myfunction2(){  //....}

export{
  myfunction1,
  myfunction2,
}
```

## server

`http-server`

```
npx http-server "S:\Proyectos\01_Clientes\Gonzalo Williams\2021\deploy"
```

Si estoy en la carpita que quiero deployar

```
npx http-server .
```
