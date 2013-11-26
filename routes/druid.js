var core  = require ('../lib/core');
var druid = require ('../lib/druid');

var logger = core.logging.getLogger ('druid-db');
logger.info ('Initializing druid storage adapter.');

/**
 * Druid query
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 */
exports.query = function (request, response) {
    var query = request.body;
    logger.error ('druid query: %j', query);
    druid.query (query, function (error, queryResponse, body) {
	if (error) { 
	    logger.error ('druid:query(E): %s', error);
	    response.end ();
	    throw error;
	} else {
	    logger.info ('druid:query(S): %j', body);
	    response.end (JSON.stringify (body));
	}
    });
}
 
