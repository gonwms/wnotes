const path = require('path');

module.exports = {
  mode: 'development',
  // mode: 'production',
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