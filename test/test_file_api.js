var path  = require ('path');
var tutil = require ('./tutil');

var logger = tutil.core.logging.getLogger ('test_file_api');

/**
 * Test public file persistence API.
 */    
describe('Test File API', function(){
    /**
     * Start the server before tests are run.
     */
    before (function () {
        tutil.startApp ();
    });    
    /**
     * Stop the server afte tests are run.
     */
    after (function () {
        tutil.stopApp ();
    });

    /**
     * Run the file persistence tests.
     */
    describe ('Verify REST file persistence API', function () {
        it ('should write a file', function (done) {
	    logger.info ('');
	    logger.info ('--sending post request to add file.');
	    tutil.rest.post ({
		uri    : tutil.conf.app.url + '/api/data/file/add',
		form   : {
		    filename : 'text.txt',
		    content  : 'a b c'
		}
	    }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    logger.info ('--file:add() got nominal response: ' + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "expected: ok status. got " + error);
		}
	    });
	});
    });
    
    /**
     * Run the binary file persistence tests.
         */
    describe ('Verify REST file persistence API - binary version', function () {
        it ('should write a file', function (done) {
	    logger.info ('');
	    logger.info ('--sending post request to add binary file.');

	    // Post this file (i.e. the code executing) to the service.
	    var uri = tutil.conf.app.url + '/api/data/file/addBinary';
	    tutil.rest.postFile (uri, __filename, 'fileObj', function (error, response, body) {
		if (! error && response.statusCode == 200) {
		    logger.info ('--file:add() got nominal response: ' + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "expected: ok status. got " + error);
		}
	    });
	});
    });

});


