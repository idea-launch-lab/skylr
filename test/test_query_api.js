var tutil = require ('./tutil');
var logger = tutil.core.logging.getLogger ('test_mongo_query_api');

/**
 * Test public MongoDB query API.
 */    
describe('Test Mongo Query API: ', function(){
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
    describe ('Test Mongo query API: ', function () {
        it ('should return name of database', function (done) {
	    logger.info ('');
	    logger.info ('--sending post request to query database.');
	    tutil.rest.post ({
		uri : /*tutil.conf.app.url*/ 'http://localhost:3000' + '/api/data/document/query',
		query : {
		    // NOTHING YET
                    //content  : 'a b c'
                }
	    }, function (error, response, body) {
		if (!error && response.statusCode == 200) {		    
		    logger.info ('--document:queryMongo() got nominal response: ' + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "expected: ok status. got " + error);
		}
	    });
				     
        });
    });
});
