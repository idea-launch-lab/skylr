/*global angular */
/*jshint unused:false */
'use strict';

/**
 * Abstract communication with the server for administrative functions.
 */
LASApp.factory ('adminService', function ($http) {

    return {

	/**
	 * Load existing application objects.
	 */
	getApps: function (callback) {
	    return $http.get ('/api/admin/app/find').success (callback);
	},

	/**
	 * Save an application object.
	 */
	saveApp : function (obj, callback) {
            $http.post ('/api/admin/app/create', obj).success (callback);
	},

	/**
	 * Save an application object.
	 */
	deleteApp : function (obj, callback) {
            $http.post ('/api/admin/app/delete', obj).success (callback);
	}
    }

});
