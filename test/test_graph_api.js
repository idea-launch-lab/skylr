var tutil = require ('./tutil');

/**
 * Test public graph persistence API.
 */    
describe('Test Graph API: ', function(){
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
     * Run the graph persistence tests.
     */
    describe ('Verify REST graph persistence API: ', function () {
        it ('should write a graph node', function (done) {

	    tutil.core.request.post ({
		uri : tutil.conf.app.url + '/graph/add',
		form : {
                    content  : 'a b c'
                }
	    }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
                    console.log ("--> " + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "Expected nominal response. Got: " + tutil.core.util.inspect (body));
		}
	    });
        });
    });
    
});
