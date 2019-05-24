# Webpack

## create proyect JSON
1. $ npm install

## install webpack & webpack-dev-server
1. $ npm install webpack -D
1. $ npm install webpack-dev-server -D

## add Scripts to Package.json

1. open package.json
1. add 
```json 
 "scripts": {
      "dev": "webpack-dev-server --env.development", 
      "prod": "webpack --env.production"
  },
```

## webpack.config.js

1. create a file called **webpack.config.js**