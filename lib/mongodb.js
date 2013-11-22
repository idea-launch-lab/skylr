var mongo = require ('mongodb');
var core = require ('./core');

var logger = core.logging.getLogger ('mongodb');

/**
 * Connect to the mongo data store.
 */
var collections = {
    db     : null
};
var mongoURL = 'mongodb://localhost:' + process.env.MONGO_PORT + '/test?';
var data = {
    auto_reconnect : true,
    poolSize       : 100,
    timeout        : 1000,
    keepAlive      : 1000
};
logger.info ("--mongo-connnect @ " + mongoURL + core.uriEncode (data));

/**
 * Create the connection and store the database object.
 * It contains and manages a pool of connections for us.
 */
mongo.MongoClient.connect (mongoURL, function(err, db) {
    if (err) {
	logger.error ("Unable to connect to mongo at " + mongoURL);
	throw err;
    } else {
	logger.info ('Connected to mongo at ' + mongoURL);
	collections.db = db;
    }
});

/**
 * Get the mongo apps collection.
 */
exports.getApps = function () {
    return collecions.db.collection ("applications");
};

/**
 * Get the mongo events collection.
 */
exports.getEvents = function () {
    return collections.db.collection ("events");
};
