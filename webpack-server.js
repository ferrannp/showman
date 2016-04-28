var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

module.exports = (PORT) => {
  const server = new WebpackDevServer(webpack(config), {
    proxy: [{
      path: '/api/show/*',
      target: 'http://0.0.0.0:' + (PORT - 1)
    }],
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  });
  server.listen(PORT, '0.0.0.0', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://localhost:' + PORT);
  });
};