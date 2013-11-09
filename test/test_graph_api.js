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

	    var args = {
		data : {
                    content  : 'a b c'
                }
	    };

	    tutil.rest.post (tutil.conf.app.url + '/graph/add', args, function (data, response) {
                console.log (data);
		done ();
	    }).on ('error', function (err) {
		tutil.assert.true (false);
	    });

        });
    });
    
});
