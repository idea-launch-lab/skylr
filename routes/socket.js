var socket = require ('socket.io');
var core = require ('../lib/core');

var messageDB = {
    messages : [
	{ id : 1, text : "a" },
	{ id : 2, text : "b" },
	{ id : 3, text : "c" },
	{ id : 4, text : "d" }
    ]
};

// export function for listening to the socket
module.exports = function (socket) {
    var name = "roger";

    // send the new user their name and a list of users
    console.log ("sending message db on init");
    socket.emit('init', messageDB);

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
	name: name
    });

    // broadcast a user's message to other users
    socket.on('user:join', function (data) {
	console.log ('--client connect ' + core.util.inspect (data));
	socket.broadcast.emit('user:join', data);
    });

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
	console.log ("---------------------> " + core.util.inspect (data));
	socket.broadcast.emit('send:message', data);
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
	socket.broadcast.emit('user:left', {
	    name: name
	});
    });
    
};
module.exports.socketIO = socket;
