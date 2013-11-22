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
    
});


