const path = require('path');

module.exports = {
	target: 'web',
	mode: 'development',
	// mode: 'production',
	devtool: 'inline-source-map',

	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		// publicPath: "src",
		compress: true,
		watchContentBase: true,
		port: 9000,
		https: true,
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
	// externals: [
	//   /^loose\/.+/
	//   //  './src/js/loose/'
	//   // './src/js/loose/ltcontrol.js'
	// ]

};