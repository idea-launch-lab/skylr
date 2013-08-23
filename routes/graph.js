var neo4j  = require('neo4j')
,   core   = require ('../lib/core');

var logger = core.logging.getLogger ('graph-db');
logger.info ('Initializing graph database adapter.');

/**
 * The graph database connection.
 */
var db = new neo4j.GraphDatabase (core.config.graphdb.url);

/**
 * Add an object to the graph data store.
 * @param {HTTPRequest} request An HTTP request object.
 * @param {HTTPResponse} response An HTTP response object.
 * @return {HTTPStatusCode} Returns an HTTP status code: 200 for success, 400 on error.
 *
 * This method expects the following arguments:
 *    (a) @param {content} The content of the node..
 */
exports.add = function (req, res) {    
    var element = { content : req.body.content };
    var node = db.createNode (element);     // instantaneous, but...
    node.save (function (err, node) {    // ...this is what actually persists.
	if (err) throw err;
        if (res) {
	    res.send (node.id, 200);
	}
    });
};
