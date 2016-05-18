if (process.env.NODE_ENV === 'production') {
  var child_process = require('child_process');
  child_process.exec("webpack -p --config webpack.production.config.js");
}