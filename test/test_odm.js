var tutil = require ('./tutil');
var Application = require ('../lib/model/application');

var logger = tutil.core.logging.getLogger ('test_odm');

describe ("Test Object Document Model (ODM) components.", function () {
    before (function () {
	tutil.startApp ();
    });
    after (function () {
	tutil.stopApp ();
    });
    describe ("Test Application ODM component", function () {
	it ('should verify application objects can be  built, saved and used', function (done) {
	    logger.info ("Testing application");
	    var app = new Application ({
		name : 'test-app',
		description : 'test app description'
	    });
	    app.about ();
	    done ();
	});
    });

});
