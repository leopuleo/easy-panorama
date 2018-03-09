module.exports = {
  context: __dirname + "/assets/scripts",
	entry: './block.js',
  devtool: "source-map",
	output: {
		path: __dirname + '/dist',
		filename: 'block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
