var tutil = require ('./tutil');

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
            tutil.rest.post (tutil.conf.app.url + '/file/add', {
                multipart: true,
                data: {
                    filename : 'text.txt',
                    content  : 'a b c'
                }
            }).on ('complete', function (data, response) {
                done ();
            }).on ('fail', function (err) {
                tutil.assert.true (false);
            });
        });
    });
    
});
