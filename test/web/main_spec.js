describe('App intialization', function() {
    it('Should initialize the app.', function() {
	browser.driver.get ('http://localhost:3000');

	browser.findElement (by.css ('.throughputChart')).then (function (element) {
	    console.log ("--found throughput chart");
	});

	browser.findElement (by.id ('toggleLoop')).
	    then (function (btn) {
		btn.click ();
		console.log ("--clicked toggleLoop button");
	    });

	var start = new Date().getTime ();
	browser.wait (function () {
	    return new Date ().getTime () - start > 3000;
	});

	browser.findElement (by.id ('toggleLoop')).
	    then (function (btn) {
		console.log ("--clicked toggleLoop button (again)");
		btn.click ();
	    });

	browser.findElement (by.css ('.eventId')).
	    then (function (elements) {
		console.log ("--found event id");
	    });
	
	browser.findElement (by.id ("toggleLoop")).
	    then (function (btn) {
		var fullMatch = element(
		    by.repeater('message in messages').
				row (0).column('[[message.id]]'));
		fullMatch.getText ().then (function (text) {
		    console.log ("--got row 0 id: " + text);

		    var number = parseInt (text);
		    var positiveNumber = number > 0;
		    expect(positiveNumber).toEqual (true);
		});
		
	    });
    });
});