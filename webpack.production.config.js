var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    showman: ["./js/index", "./sass/index.scss"]
  },
  output: {
    path: path.join(process.env.PWD, 'dist'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.production.html',
      filename: 'index.html'//,
      //favicon: './assets/favicon.ico'
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
    }),
    // Avoid moment to load all locales by default = heavy bundle
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-US)$/)
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("css-loader?sourceMap!postcss-loader!sass?sourceMap")
    }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
      include: path.join(process.env.PWD, 'js')
    }, {
      test: /\.json?$/,
      loaders: ["json-loader"]
    }, {
      test: /\.svg?g$/,
      loader: "file-loader?name=img/img-[hash:6].[ext]"
    }, 
      {
      test: /\.png?g$/,
      loader: "file-loader?name=fav/[name].[ext]"
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};