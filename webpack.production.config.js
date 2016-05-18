var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    showman: ["./js/index.js", "./sass/index.scss"]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.production.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css', {
      publicPath: '/',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("css-loader?sourceMap!postcss-loader!sass?sourceMap")
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'js')
    }, {
      test: /\.json?$/,
      loaders: ["json-loader"]
    }, {
      test: /\.svg?g$/,
      loader: "file-loader?name=img/img-[hash:6].[ext]"
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};