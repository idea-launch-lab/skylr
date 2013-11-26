var mongoose = require ('mongoose');
var core     = require ('./core');
var connect  = require ('./mongoose');

var logger = core.logging.getLogger ('odm');

module.exports = {
    schema : function (spec) {
	return mongoose.Schema (spec);
    },
    model : function (name, schema) {
	return mongoose.model (name, schema);
    }
};







