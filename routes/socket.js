var socket = require ('socket.io');
var core   = require ('../lib/core');

var logger = core.logging.getLogger ('socket.io');

// export function for listening to the socket
module.exports = function (socket) {

    var name = "roger";

    // send the new user their name and a list of users 
    logger.debug ("sending message db on init");
    //socket.emit('init', messageDB);

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
	name: name
    });

    // broadcast a user's message to other users
    socket.on('user:join', function (data) {
	logger.debug ('--socket->client_connect() %j', data);
	socket.broadcast.emit ('user:join', data);
    });

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
	logger.debug ("--socket->broadcast(send:message) %j ", data);
	socket.broadcast.emit('send:message', data);
    });

    // broadcast a user's message to other users
    socket.on('send:message:buf', function (data) {
	logger.debug ("--socket->broadcast(send:message:buf) %j ", data);
	socket.broadcast.emit('send:message:buf', data);
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
	socket.broadcast.emit('user:left', {
	    name: name
	});
    });
    
};
module.exports.socketIO = socket;
