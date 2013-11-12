var tutil = require ('./tutil');

/**
 * Test public document persistence API.
 */    
describe('Test Document API: ', function(){
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
     * Run the document persistence tests.
     */
    describe ('Verify REST document persistence API: ', function () {
        it ('should write a document', function (done) {
	    tutil.core.request.post ({
		uri : tutil.conf.app.url + '/document/add',
		form : {
                    content  : 'a b c'
                }
	    }, function (error, response, body) {
		if (!error && response.statusCode == 200) {		    
                    console.log ("\n --> " + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "expected: ok status. got " + error);
		}
	    });
				     
        });
    });
});
