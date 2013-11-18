var odm = require('../odm');
var core = require('../core');
var logger = core.logging.getLogger ('application');

var applicationSchema = odm.schema ({
    name        : String,
    description : String,
    key         : String
});
applicationSchema.methods.about = function () {
    logger.info ('application create' + this.name + ' desc: ' + this.description);
};
logger.info ('compiling application model');
var Application = odm.model ('Application', applicationSchema);
Application.on ('error', function (error) {
    logger.error ('Error using application object' + error);
    throw error;
});

module.exports = Application;
