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
	],
	// externals: [
	//   /^loose\/.+/
	//   //  './src/js/loose/'
	//   // './src/js/loose/ltcontrol.js'
	// ]

};