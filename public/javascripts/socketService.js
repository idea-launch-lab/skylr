/*global angular */
/*jshint unused:false */
'use strict';

LASApp.factory ('socketService', function ($rootScope) { 
    var socket = io.connect ();
    return {
	on: function (eventName, callback) {
	    socket.on (eventName, function () {  
		var args = arguments;
		$rootScope.$apply (function () {
		    callback.apply (socket, args);
		});
	    });
	},
	emit: function (eventName, data, callback) {
	    socket.emit (eventName, data, function () {
		var args = arguments;
		$rootScope.$apply (function () {
		    if (callback) {
			callback.apply (socket, args);
		    }
		});
	    })
	}
    };
});

function BufferedEmitter () {
    this.buffer = [];
    this.maxSize = 10;
}

BufferedEmitter.prototype.send = function (socket, type, message) { 
    if (this.buffer.length >= this.maxSize) {
	if (socket !== null && socket !== undefined) {
	    console.log ('yeah, sending'); console.log (this.buffer);
	    socket.emit (type, { data : this.buffer });
	} else {
	    throw "null socket sending buffered messages";
	}
    } else {
	this.buffer.push (message);
    }
};

