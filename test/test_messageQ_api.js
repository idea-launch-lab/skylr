var tutil = require ('./tutil');
var logger = tutil.core.logging.getLogger ('test_doc_api');

/**
 * Test public messageQ persistence API.
 */    
describe('Test MessageQ API: ', function(){
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
     * Run the message Q tests.
     */
    describe ('Verify REST MessageQ API: ', function () {
        it ('should add a message to Kafka', function (done) {
	    logger.info ('');
	    logger.info ('--sending post request to post message to Kafka.');
	    tutil.rest.post ({
		uri : tutil.conf.app.url + '/api/data/messageQ/add',
		form : {
                    content  : 'a b c'
                }
	    }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    logger.info ('--messageQ:add() got nominal response: ' + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "expected: ok status. got " + error);
		}
	    });
				     
        });
    });
});
