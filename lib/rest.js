var request = require ('request');
var core = require ('./core');

module.exports = {
    post : function (args, handler) {
	request.post (args, handler);
    }
};
