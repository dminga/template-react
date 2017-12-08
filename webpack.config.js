var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssName     = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
const bundleName  = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

module.exports = {
  entry: [ 'babel-polyfill', './src/index.js' ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/assets/',
    filename: bundleName
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  plugins: [ new ExtractTextPlugin(cssName) ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: [ /node_modules/, /dist/ ] },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader') }
    ]
  }
}
