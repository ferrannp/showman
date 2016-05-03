var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: ['eval', 'source-map'],
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './sass/index.scss',
    './js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader?sourceMap", "postcss-loader", "sass?sourceMap"]
    },
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'js')
    },
    {
      include: /\.json$/,
      loaders: ["json-loader"]
    }]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
