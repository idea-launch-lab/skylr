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
            tutil.rest.post (tutil.conf.app.url + '/graph/add', {
                data: {
                    content  : 'a b c'
                }
            }).on ('complete', function (data, response) {
                console.log (data);
                done ();
            }).on ('fail', function (err) {
                tutil.assert.true (false);
            });
        });
    });
    
});
