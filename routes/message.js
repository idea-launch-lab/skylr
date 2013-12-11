var core     = require ('../lib/core');
var producer = require ('../lib/messageQ');

var logger = core.logging.getLogger ('prozess->kafka');

// https://npmjs.org/package/prozess

/**
 * Add an object to the kafka publish/subcribe queue.
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 * This method expects the following arguments:
 *    (a) @param {content} The content of the document.
 */
exports.add = function (request, response, sioClient) {
    var message = request.body;
    message.utcdt = new Date ().toISOString ()
    producer.send (JSON.stringify (message), function (err) {
	if (err) {
	    logger.error (err);
	    response.end ();
	    throw err;
	} else {
	    logger.debug ('--messageQ->write() %j', message);
	    response.end (JSON.stringify ({ status : 'ok' }));
	}
    });
};
