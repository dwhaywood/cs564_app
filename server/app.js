/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';


var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 4;

/*throng({
  workers: WORKERS ,
  lifetime: Infinity,
  start: start,
  master: initializeStart
    
});*/

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

function start() {
    // Setup server
    var app = express();
    var server = http.createServer(app);
    require('./config/express').default(app);
    require('./routes').default(app);
    
    startServer();
    // Start server
    function startServer() {
      app.angularFullstack = server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
      });
    }
}

function initializeStart(){
    sqldb.sequelize.sync()
      .then(function () {
        startServer();
        console.log('Database initialized'); 
        }).catch(function(err) {
        console.log('Server failed to start due to error: %s', err);
      });
}


// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

initializeStart();
// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// Expose app
exports = module.exports = app;
