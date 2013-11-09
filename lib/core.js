var util   = require('util');
var logging = require ('../lib/logger');
var config = require ('../lib/conf/' + process.env.NODE_ENV);
var logger = logging.getLogger ('core');
var Client = require('node-rest-client').Client;
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
exports.rest = new Client ();
/**
 * Async - program flow control.
 */
exports.async = async;