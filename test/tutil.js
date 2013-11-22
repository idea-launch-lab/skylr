var assert = require ("assert");
var http   = require ("http");

var core   = require ('../lib/core');
var rest   = require ('../lib/rest');
var server = require ('../lib/server');

var logger = core.logging.getLogger ('tests');

/**
 * Utility object for tests.
 * Aggregates configuration items and services.
 */
var tutil = {
    assert   : assert,
    http     : http,
    rest     : rest,
    core     : core,
    conf     : {
        embedded : false /*,
        app : {
            host : 'localhost',
            port : tutil.conf.app.port,
            url  : null
        }
*/
    }
};

// URL to the app.
tutil.conf.app = {};
tutil.conf.app.url = 'http://localhost:' + tutil.core.config.port;

// Start the application.
tutil.startApp = function () {
    if (tutil.conf.embedded) {
        logger.info ("Starting application on port: " + tutil.conf.app.port);
        server.listen (tutil.conf.app.port);
    }
};

// Stop the application.
tutil.stopApp = function () {
    if (tutil.conf.embedded) {
        logger.info ("Shutting down application");
        server.close ();
    }
};

module.exports = tutil;
