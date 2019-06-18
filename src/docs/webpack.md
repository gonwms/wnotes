# Webpack

## Install
1. $ npm install
1. $ npm install webpack -D
1. $ npm install webpack-dev-server -D
1. install all devDepenndencies ej: [$ npm i file-loader -D ]

### Edit Package.json
```json 
{
{
      "name": "name",
      "version": "1.0.0",
      "description": "...",
      "main": "app.js",
      "author": "gonwms",
      "private": true,
      "scripts": {
            "server": "webpack-dev-server",
            "build": "webpack",
            "watch": "webpack --watch"
      },
      "devDependencies": {
            "@babel/core": "^7.4.5",
            "@babel/preset-env": "^7.4.5",
            "babel-loader": "^8.0.6",
            "copy-webpack-plugin": "^5.0.3",
            "css-loader": "^2.1.1",
            "eslint": "^5.16.0",
            "eslint-loader": "^2.1.2",
            "file-loader": "^3.0.1",
            "style-loader": "^0.23.1",
            "webpack": "^4.33.0",
            "webpack-cli": "^3.3.2",
            "webpack-dev-server": "^3.4.1"
      },
      "dependencies": {
            "gsap": "^2.1.3",
            "lottie-web": "^5.5.4"
      }
}

```

### webpack.config.js

1. create a file called **webpack.config.js**

```javascript 
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	target: 'web',
	// mode: 'development',
	mode: 'production',
	// devtool: 'inline-source-map',
	devtool: 'none',
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		compress: true,
		watchContentBase: true,
		port: 9000,
		// https: true,
	},
	// performance: {
	//   maxEntrypointSize: 244000
	// },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
			{
				enforce: "pre",
				test: /\. js$/,
				use: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
		]
	},
	plugins: [
		new CopyPlugin([
			{
				from: 'src/index.html', to: './',
			},
			{
				from: 'src/img/bluebar_anim.json', to: './img',
			},
		]),
		new CompressionPlugin(),
	],
	// externals: [
	//   /^loose\/.+/
	//   //  './src/js/loose/'
	//   // './src/js/loose/ltcontrol.js'
	// ]

};

```
### config esLint
1. instalar eslint
`$ ./node_modules/.bin/eslint --init`

2. config esLint
```javascript
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "no-alert": "off",
        "no-unused-vars":"off"
    }
}
```
### config babel
1. install `npm install @babel/plugin-syntax-dynamic-import`
1. crear archivo .babelrc
2. configurar .babelrc
```javascript
{
	"plugins": ["@babel/plugin-syntax-dynamic-import"]
}
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