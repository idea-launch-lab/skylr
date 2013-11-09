/**
 * The main application loads and runs the server.
 */
var http = require('http');
var server = require ('./lib/server');
var core = require ('./lib/core');
var logger = core.logging.getLogger ('app');

var port = process.env.PORT || core.config.port;

server.listen (function () {
    logger.info ('System listening on port ' + port + '.');
});

