var mongoose = require('mongoose');
var core = require('./core');
var logger = core.logging.getLogger ('kitty');

module.exports = {
    schema : function (spec) {
	return mongoose.Schema (spec);
    },
    model : function (name, schema) {
	return mongoose.model (name, schema);
    }
};







