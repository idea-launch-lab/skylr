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
            tutil.rest.post (tutil.conf.app.url + '/document/add', {
                data: {
                    content  : 'a b c'
                }
            }).on ('complete', function (data, response) {
                //console.log (data);
                done ();
            }).on ('fail', function (err) {
                tutil.assert.true (false);
            });
        });
    });
    
});
