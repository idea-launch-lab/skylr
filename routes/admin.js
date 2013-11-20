var core = require ('../lib/core');
var Application = require ('../lib/model/application');
var logger = core.logging.getLogger ('admin_route');

/*
 * Admin controllers.
 */

exports.index = function (req, res) {
	res.render('admin/index', { title: 'Admin' });
};

exports.findApps = function (request, response) {
    logger.info ("finding applications.");
    Application.find (function (error, apps) {
	response.write (JSON.stringify (apps));
	response.end ();
    });
};

exports.deleteApp = function (request, response) {
    request.assert ('id', 'Application id required').notEmpty ().isAlpha ();
    logger.info ("deleting application: " + request.body);
    logger.info ("deleting application: " + request.body._id);
    Application.findById (request.body._id, function (error, app) {
	if (error) {
	    response.send ('No such application', 404);
	} else {
	    app.remove (function (error, app) {
		response.write (JSON.stringify ({ status : 'ok' }));
		response.end ();
	    });
	}
    });
};

exports.createApp = function (request, response) {
    request.assert ('name', 'Application name required').notEmpty ().isAlpha ();
    request.assert ('description', 'Application description required').notEmpty ().isAlpha ();
    var application = new Application ({
	name : request.body.name,
	description : request.body.description
    });
    application.save (function (error, app) {
	    response.write (JSON.stringify (app));
	response.end ();
	
    });
    logger.info ("saved application: " + core.util.inspect (application));
};
