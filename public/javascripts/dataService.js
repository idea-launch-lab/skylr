/*global angular */
/*jshint unused:false */
'use strict';

instrumentationApp.factory ('dataService', function ($http) {
    return {
	addFile: function (obj) {
	    return $http.post ('/file/add', obj)
		.then (function (result) {
		    //console.log (result);
		    return result;
		});
	}
    }
});
