const path = require('path');

module.exports = {
  context: __dirname + "/assets/scripts",
	entry: {
    'block': './block.js'
  },
  devtool: "source-map",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
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
