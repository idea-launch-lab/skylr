var mongoose = require ('mongoose');
var core     = require ('./core');

logger = core.logging.getLogger ('mongoose-odm');

/**
 * ================================================================
 * == Mongoose - Object Document Modeling (ODM) support
 * ================================================================
 */
mongoose.connect (core.config.documentdb.url);

var db = mongoose.connection;

db.on ('error', logger.error.bind (logger, 'connection error:'));

db.once ('open', function callback () {
    logger.info ('Executing one-time mongoose ODM initialization');
});

