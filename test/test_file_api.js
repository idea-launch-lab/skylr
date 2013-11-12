var tutil = require ('./tutil');
var request = require ('request');

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
	    tutil.core.request.post ({
		uri    : tutil.conf.app.url + '/file/add',
		form   :  {
		    filename : 'text.txt',
		    content  : 'a b c'
		}
	    }, function (error, response, body) {
		if (!error && response.statusCode == 200) {
                    console.log ("--> " + body);
		    done ();
		} else {
		    tutil.assert.fail (error, "expected: ok status. got " + error);
		}
	    });
	});
    });
    
});


/*

request({
  uri: "http://www.cjihrig.com/development/php/hello_form.php",
  method: "POST",
  form: {
    name: "Bob"
  }
}, function(error, response, body) {
  console.log(body);
});
*/
/*
	    var args = {
		data : {
		    filename : 'text.txt',
		    content  : 'a b c'
		}
	    };

	    tutil.rest.post (tutil.conf.app.url + '/file/add', args, function (data, response) {
                console.log (data);
		done ();
	    }).on ('error', function (err) {
		console.log (err);
		tutil.assert.fail (err, "expected: ok status");
	    });
        });
*/
