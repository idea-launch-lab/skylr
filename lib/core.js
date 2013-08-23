var util   = require('util');
var logging = require ('../lib/logger');
var config = require ('../lib/conf/' + process.env.NODE_ENV);

var logger = logging.getLogger ('core');
logger.info ("Initializing core.");

/**
 * The core module provides a consolidated interface to core system services.
 */

/**
 * Logging module.
 */
exports.logging = logging;
/**
 * Node standard utilities modules.
 */
exports.util = util;
/**
 * Application configuration module.
 */
exports.config = config;
