var core = require ('../lib/core');
var Application = require ('../lib/model/application');
var logger = core.logging.getLogger ('admin_route');

/*
 * Admin controllers.
 */

exports.index = function(req, res){
  res.render('admin/index', { title: 'Admin' });
};

exports.createApp = function (request, response) {
    request.assert ('name', 'Application name required').notEmpty ().isAlpha ();
    request.assert ('description', 'Application description required').notEmpty ().isAlpha ();
    var application = new Application ({
	name : request.body.name,
	description : request.body.description
    });
    application.save (function (error, app) {
	//response.send (app, 200);
	response.write (JSON.stringify (app));
	response.end ();

    });
    logger.info ("saved application: " + core.util.inspect (application));
};

