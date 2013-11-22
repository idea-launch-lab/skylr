var util   = require('util');
var logging = require ('../lib/logger');
var config = require ('../lib/conf/' + process.env.NODE_ENV);
var logger = logging.getLogger ('core');
var request = require('request');
var async = require ('async');
logger.info ("Initializing core.");

/**
 * A consolidated interface to core system services.
 */

/**
 * Application configuration module.
 */
exports.config = config;
/**
 * Logging module.
 */
exports.logging = logging;
/**
 * Node standard utilities modules.
 */
exports.util = util;
/**
 * REST client
 */
exports.request = request;
/**
 * Async - program flow control.
 */
exports.async = async;

/**
 * Encode an object as URL parameters
 */
exports.uriEncode = function (obj) {
    return Object.keys (obj).map(function(k) {
	return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
    }).join('&');
}
