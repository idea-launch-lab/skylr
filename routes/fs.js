var fs     = require ('fs');
var core   = require ('../lib/core');

var logger = core.logging.getLogger ('file-db');
logger.info ('Initializing file storage adapter.');

/**
 * Add a file object to the data store.
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 * This method expects the following arguments:
 *    (a) @param {text} filename The name of the file to store.
 *    (b) @param {content} The file content must be multi-part encoded.
 */
exports.add = function (request, response, sioClient) {
    request.assert ('filename', 'Filename required').notEmpty ().isAlpha ();

    var fileName = request.body.filename;
    var file = core.config.file.root + '/' + fileName;

    logger.info ('--file->write(): ' + fileName);
    logger.info ("request: " + core.util.inspect (request.body));

    // Write the file.
    fs.writeFile (file, request.body.content, function (err) {
	if (err) { 
	    logger.error ('--file->write(): ' + fileName);
	    response.end ();
	    throw err;
	} else {
	    logger.info ('--file->write()->success: ' + fileName);
	    response.end ('ok');
	}
    });
}
