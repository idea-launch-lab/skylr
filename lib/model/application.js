var core = require ('../core');
var odm  = require ('../odm');

var logger = core.logging.getLogger ('application');

// Schema of an application.
var applicationSchema = odm.schema ({
    name        : String,
    description : String,
    key         : String
});

applicationSchema.methods.about = function () {
    logger.info ('application create' + this.name + ' desc: ' + this.description);
};

logger.info ('compiling application model');

// Compile the application schema.
var Application = odm.model ('Application', applicationSchema);
Application.on ('error', function (error) {
    logger.error ('Error using application object' + error);
    throw error;
});

// Export the application model.
module.exports = Application;
