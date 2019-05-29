# Webpack

## Install
1. $ npm install
1. $ npm install webpack -D
1. $ npm install webpack-dev-server -D
1. install all devDepenndencies ej: [$ npm i file-loader -D ]

## Edit Package.json
```json 
{
    "name": "name",
    "version": "1.0.0",
    "description": "",
    "author": "",
    "license": "ISC",

    "private": true,
    "scripts": {
        "server": "webpack-dev-server",
        "build": "webpack"
    },
    "devDependencies": {
        "css-loader": "^2.1.1",
        "file-loader": "^3.0.1",
        "style-loader": "^0.23.1",
        "webpack": "^4.32.2",
        "webpack-cli": "^3.3.2",
        "webpack-dev-server": "^3.4.1"
    },
    "dependencies": {}
}
```

## webpack.config.js

1. create a file called **webpack.config.js**

```javascript 
const path = require('path');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    // contentBase: path.resolve( __dirname, '/src'), 
  },
  module: {
      rules: [
          {
            test: /\.css$/,
            use: ['style-loader','css-loader',]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
              'file-loader'
            ]
          },  
      ]
  },
};

```

## Modules

### import
```javascript
import '../css/style.css';
import {myFunction} from './include.js';

```

### export
```javascript
export { myFunction, myVariable };
```