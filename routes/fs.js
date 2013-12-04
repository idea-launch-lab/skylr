var fs     = require ('fs');
var path   = require ('path');
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
exports.add = function (request, response) {
    request.assert ('filename', 'Filename required').notEmpty ().isAlpha ();

    var fileName = request.body.filename;
    var file = core.config.service.uploadPath + '/' + fileName;

    logger.info ('add: %s %j', fileName, request.body);

    // Write the file.
    fs.writeFile (file, request.body.content, function (err) {
	if (err) { 
	    logger.error ('add(E): %s', fileName);
	    response.end ();
	    throw err;
	} else {
	    logger.info ('add(S): %s', fileName);
	    response.end ('ok');
	}
    });
};

function respond (response, text, status) {
    response.statusCode = status;
    response.setHeader ('Content-Length', text.length);
    response.end (text);
};

/**
 * Add a binary file object to the data store.
 * Must be multi-part encoded. 
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 * This method expects the following arguments:
 *    (a) @param {text} filename The name of the file to store.
 *    (b) @param {content} The file content must be multi-part encoded.
 * http://howtonode.org/really-simple-file-uploads
 */
exports.addBinary = function (request, response) {
    
    request.assert ('files', 'File list required').notEmpty ();
    request.assert ('files.fileObj', 'Filename required').notEmpty ().isAlpha ();
    request.assert ('files.fileObj.path', 'Filename path required').notEmpty ().isAlpha ();
    request.assert ('files.fileObj.size', 'File size required').notEmpty ().isInt ();
    if (request.files.fileObj.size > core.config.service.maxUploadSize) {
	throw "Binary object size exceeds max upload size configured: " + core.config.service.maxUploadSize + ". Fail.";
    }
    var fileName = request.files.fileObj.path;
    logger.info ('reading uploaded binary file: ' + fileName);

    // synchronous verification of uploaded file size.
    var stat = fs.statSync (fileName);
    if (stat.size == request.files.fileObj.size) {
	logger.info ('read bytes of uploaded file.');
	respond (response, 'ok', 200);
    } else {
	var message = 'read ' + stat.size + ' of total posted ' + request.file.fileObj.size + ' bytes.';
	respond (response, message, 200);
	logger.info ('size test failed on uploaded file.');
    }
};
 
