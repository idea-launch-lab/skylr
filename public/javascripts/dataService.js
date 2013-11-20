/*global angular */
/*jshint unused:false */
'use strict';

/**
 * Abstract layer representing data operations
 */
LASApp.factory ('dataService', function ($http) {
    return {
	addFile: function (obj) {
	    return $http.post ('/api/data/file/add', obj)
		.then (function (result) {
		    return result;
		});
	}
    }
});
