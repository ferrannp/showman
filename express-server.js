var express = require('express');
var compression = require('compression');
var path = require('path');
var fetch = require('node-fetch');
var fs = require('fs');

var TRAKT_API_KEY;
if(process.env.NODE_ENV === 'production'){
  TRAKT_API_KEY = process.env.TRAKT_API_KEY;
}
else {
  TRAKT_API_KEY = require('./secrets').TRAKT_API_KEY;
}

const app = express();

module.exports = (PORT) => {
  
  app.use(compression());
  app.use(express.static(path.join(process.env.PWD, 'dist')));
  
  app.use('/api/shows/*', function (req, res) {

    function checkResponse(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        throw {status: response.status, statusText: response.statusText};
      }
    }

    var initFetch = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': TRAKT_API_KEY
      }
    };

    var showId = req.params[0];

    fetch('https://api-v2launch.trakt.tv/shows/' + showId + '?extended=full,images', initFetch)
      .then(checkResponse)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
      return res.json(json);
    }).catch(function (error) {
      return res.status(error.status).send(error);
    })
  });
  
  app.use('/shows/*', function (req, res) {
    var showId = req.params[0];
    fs.readFile(path.join(process.env.PWD, 'dist/index.html'), 'utf-8', function (error, html) {
      const meta = '<meta property="og:url" content="https://trakt.tv/shows/' + showId + '"/>';
      var newHtml = html.replace(/<\/head>/, meta + '</head>');
      res.send(newHtml);
    });
  });
  
  app.get('*', function(req, res) {
    res.sendFile(path.join(process.env.PWD, 'dist/index.html'));
  });
  
  app.listen(PORT);
};