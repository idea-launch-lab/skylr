var util = require ('util');
var io = require('socket.io-client');
var should = require ('should');

var socketURL = 'http://0.0.0.0:3000';

var options = {
  transports: [ 'websocket' ],
  'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};

describe ("Socket Server",function () {
    it('Should broadcast new user to all users', function(done){
	var client1 = io.connect (socketURL, options);

	client1.on ('connect', function (data) {
	    console.log ('--client1 connect');

	    /* Since first client is connected, we connect the second client. */
	    var client2 = io.connect (socketURL, options);

	    client1.emit ('user:join', chatUser1);

	    client2.on ('connect', function (data) {
		console.log ('--client2 connect');
		client2.emit('user:join', chatUser2);
	    });

	    client2.on ('user:join', function (usersName) {
		console.log ('--client2->user:join: ' + util.inspect (usersName));
		usersName.name.should.equal (chatUser2.name);
		client2.disconnect();
	    });

	});

	var numUsers = 0;
	client1.on ('user:join', function(usersName){
	    numUsers += 1;

	    if (numUsers === 2){
		usersName.name.should.equal (chatUser2.name);
		client1.disconnect ();
		done ();
	    }
	});
    });
});