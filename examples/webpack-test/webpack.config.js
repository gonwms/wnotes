const path = require('path');

module.exports = {
  // mode: 'development',
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
            use: ['file-loader']
          }      
      ]
  }
};