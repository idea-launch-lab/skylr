var assert = require("assert");
var http = require("http");
var core = require ('../lib/core');
var rest = require('../lib/rest');
var server = require ('../lib/server');
var logger = core.logging.getLogger ('tests');

var tutil = {
    assert   : assert,
    http     : http,
    rest     : rest,
    core     : core,
    conf     : {
        embedded : false, //true,
        app : {
            host : 'localhost',
            port : '3000',
            url  : null
        },
	pathToSeleniumJar : '/opt/las/app/selenium-server-standalone-2.37.0.jar'
    }
};
tutil.conf.app.url = 'http://' + tutil.conf.app.host + ':' + tutil.conf.app.port;

tutil.startApp = function () {
    if (tutil.conf.embedded) {
        logger.info ("Starting application on port: " + tutil.conf.app.port);
        server.listen (tutil.conf.app.port);
    }
};
tutil.stopApp = function () {
    if (tutil.conf.embedded) {
        logger.info ("Shutting down application");
        server.close ();
    }
};

module.exports = tutil;
