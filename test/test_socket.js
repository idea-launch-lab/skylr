var util = require ('util');
var io = require('socket.io-client');
var should = require ('should');
var tutil = require ('./tutil');

var logger = tutil.core.logging.getLogger ('test_socket');

var socketURL = 'http://0.0.0.0:3000';

var options = {
  transports: [ 'websocket' ],
  'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};

describe ("Test websocket server",function () {
    it('Should broadcast new user to all users', function(done){
	var client1 = io.connect (socketURL, options);

	client1.on ('connect', function (data) {
	    logger.info ('');
	    logger.info ('--client-1 connected via socket.io.');

	    /* Since first client is connected, we connect the second client. */
	    var client2 = io.connect (socketURL, options);

	    client1.emit ('user:join', chatUser1);

	    client2.on ('connect', function (data) {
		logger.info ('--client-2 connected via socket.io.');
		client2.emit('user:join', chatUser2);
	    });

	    client2.on ('user:join', function (usersName) {
		logger.info ('--client-2->user:join' + util.inspect (usersName));
		usersName.name.should.equal (chatUser2.name);
		client2.disconnect();
	    });

	});

	var numUsers = 0;
	client1.on ('user:join', function(usersName){
	    numUsers += 1;

	    if (numUsers === 2){
		logger.info ('--2 users, testing name');
		usersName.name.should.equal (chatUser2.name);
		client1.disconnect ();
		done ();
	    }
	});
    });
});