/*global angular */
/*jshint unused:false */
'use strict';


var eventStream = new BufferedEmitter ();
var fileEventStream = new BufferedEmitter ();

/**
 * Abstract layer representing data operations
 */
LASApp.factory ('dataService', function ($http) {
    return {

	/**
	 * Add a file.
	 */
	addFile: function (obj, socket) {
	    return $http.post ('/api/data/file/add', obj)
		.then (function (result) {
		    // todo: batch these
		    if (socket) {
			socket.emit ('send:message', obj);
		    }
		    //fileEventStream.send (socket, 'send:message:buf', obj);
		    return result;
		});
	},

	/**
	 * Add an event.
	 */
	addEvent: function (obj, socket) {
	    return $http.post ('/api/data/document/add', obj)
		.then (function (result) {
		    // todo: batch these
		    if (socket) {
			socket.emit ('send:message', obj);
		    }
		    //eventStream.send (socket, 'send:message:buf', obj);
		    return result;
		});
	}
    }
});
