var mongo  = require ('mongoskin')
,   core   = require ('../lib/core');

var logger = core.logging.getLogger ('document-db');

// Set up the connection to the local db
var options = { safe : true };
var db = mongo.db (core.config.documentdb.url, options);
db.bind (core.config.documentdb.defaultCollection);

logger.info ('Initializing document database adapter.');
logger.debug ('  --settings: ', core.util.inspect (options));

/**
 * Add an object to the document data store.
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 * This method expects the following arguments:
 *    (a) @param {content} The content of the document.
 */
exports.add = function (request, response) {
    var doc = {
        data : request.body.content
    };
    logger.debug ('document store writing: ' + core.util.inspect (doc));
    var callback = function (err, result) {
        if (err) throw err;
        if (result) {
            response.send (result[0]._id, 200);
        }
    };
    db.collection.insert (doc, callback);
};
