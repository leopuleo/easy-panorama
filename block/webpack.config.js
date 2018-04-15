const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin( {
  filename: './editor.css',
} );

const cleanDist = new CleanWebpackPlugin( [
  path.resolve(__dirname, 'dist')
] );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle:
          'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
      },
    },
  ],
};


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    'block': './index.js',
  },
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: blocksCSSPlugin.extract( extractConfig ),
      },
    ],
  },
  plugins: [
    cleanDist,
    blocksCSSPlugin
  ],
};
