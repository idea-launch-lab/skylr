var core   = require ('../lib/core');
var db = require ('../lib/mongodb');

var logger = core.logging.getLogger ('doc-db');

/**
 * Add an object to the document data store.
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 * This method expects the following arguments:
 *    (a) @param {content} The content of the document.
 */
exports.add = function (request, response, sioClient) {
    var doc = { data : request.body.content };
    logger.info ('--doc->write(): ' + core.util.inspect (doc));
    db.getEvents ().insert (doc, function (err, obj) {
	if (err) {
	    logger.error (err);
	    response.end ();
	    throw err;
	} else {
	    logger.info ('--doc-wrote: ' + core.util.inspect (obj));
	    response.end (JSON.stringify (obj));
	}
    });
};
