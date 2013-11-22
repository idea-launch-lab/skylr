/*global angular */
/*jshint unused:false */
'use strict';

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
		    return result;
		});
	}
    }
});
