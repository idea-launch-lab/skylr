var core  = require ('../lib/core');
var druid = require ('../lib/olap');

var logger = core.logging.getLogger ('olap-db');
logger.info ('Initializing OLAP adapter.');

/**
 * OLAP query
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 */
exports.query = function (request, response) {
    var query = request.body;
    logger.info ('query: %j', query);
    druid.query (query, function (error, queryResponse, body) {
	if (error) {
	    logger.error ('olap:query(E): %s', error);
	    response.end ();
	    throw error;
	} else {
	    logger.info ('olap:query(S): %j', body);
	    response.end (JSON.stringify (body));
	}
    });
}
 
