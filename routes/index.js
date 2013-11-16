
var admin = require ('./admin');

/*
 * GET home page.
 */

exports.index = function (request, response){
  response.render ('index',
		   { title: 'LAS Event Service' });
};

exports.admin = admin.index;
