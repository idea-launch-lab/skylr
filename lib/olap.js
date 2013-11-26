var core = require ('./core');
var rest = require ('./rest');

var logger = core.logging.getLogger ('olap');

/**
 * Execute queries on the Druid data store.
 */
exports.query = function (query, callback) {
    logger.debug ('Issuing request to %s -> %j', core.config.druid.URI, query);
    rest.post ({
	uri  : core.config.druid.URI,
	json : query
    }, callback);
};
