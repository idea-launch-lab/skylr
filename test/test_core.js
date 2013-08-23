var tutil = require ('./tutil');
/**
 *
 * Unit tests.
 *
 */ 
describe('Test', function(){
    
    before(function () {
        tutil.startApp ();
    });
    
    after(function () {
        tutil.stopApp ();
    });
    
    describe ('GET /', function () {
        it ('should return a nominal HTTP status.', function () {
            tutil.http.get (tutil.conf.app.url, function (res) {
                tutil.assert.equal (200, res.statusCode);
            });
        });
    });

    describe ('Verify HTML5 content.', function () {
        it ('should return HTML5 content.', function (done) {
            tutil.http.get (tutil.conf.app.url, function (res) {
                tutil.assert.equal (200, res.statusCode);            
                var data = [];
                res.on ('data', function (chunk) {
                    data.push (chunk);
                });                
                res.on ('end', function () {
                    var text = data.join ('');
                    var value = text.indexOf ('DOCTYPE') > -1;
                    tutil.assert.equal (true, value);
                    done ();
                });
            });
        });
    });

});
