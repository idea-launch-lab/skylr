var core = require ('./core');
var rest = require ('./rest');

var logger = core.logging.getLogger ('druid');

/**
 * Execute queries on the Druid data store.
 */
exports.query = function (query, callback) {
    logger.info ('druid query: %j', query);
    rest.post ({
	uri  : core.config.druid.URI,
	form : query
    }, callback);
};
