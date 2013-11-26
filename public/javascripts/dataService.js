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
	 * Get a list of available storage channels.
	 */
	getStorageChannels : function () {
	    return [
		{ name : 'File',        uri : '/api/data/file/add' },
		{ name : 'Document',    uri : '/api/data/document/add' },
		{ name : 'Kafka/Druid', uri : '/api/data/messageQ/add' } 
	    ];
	},
	/**
	 * Send an event to the given data channel (URI)
	 */
	sendEvent: function (uri, obj, socket) {
	    return $http.post (uri, obj)
		.then (function (result) {
		    // todo: batch these
		    if (socket) {
			socket.emit ('send:message', obj);
		    }
		    return result;
		});
	},
	/**
	 * Query 
	 */
	query: function (uri, query) {
	    return $http.post (uri, query)
		.then (function (result) {
		    return result;
		});
	}
    }
});
