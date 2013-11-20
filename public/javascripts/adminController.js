/*global todomvc, angular */
'use strict';

/**
 * Admin controller - processes admin UI events.
 */
LASApp.controller ('adminController', function AdminController ($scope, adminService) {

    // Controller data members.
    $scope.title = "Administration";
    $scope.newAppVisible = false;
    $scope.loadingIsDone = false;
    $scope.apps = [];
    $scope.newAppObj = null;
    var blankApp = {
	name : '',
	description : '',
	creationDate : null
    };

    // Initialize - load existing apps.
    adminService.getApps (function (apps) {
	$scope.apps = apps;
	for (var c = 0; c , apps.length; c++) {
	    var app = apps [c];
	    console.log (app);
	    if (app === undefined)
		break;
	    app['id'] = app._id;
	}
	console.log (apps);
	$scope.loadingIsDone = true;
    });
    
    // Toggle display of fields to create a new app.
    $scope.newApp = function () {
	if ($scope.newAppVisible) {
	    $scope.newAppVisible = false;
	} else {
    	    $scope.newAppObj = angular.copy (blankApp);
	    $scope.newAppVisible = true;
	}
    }
    
    // Save a new app.
    $scope.saveApp = function () {
	adminService.saveApp ($scope.newAppObj, $scope.handleAppCreated);
	$scope.newAppVisible = false;
    };

    // Save a new app.
    $scope.deleteApp = function (index) {
	adminService.deleteApp ($scope.apps [index], function (result) {
	    $scope.apps.splice (index, 1);
	});
    };

    // Handle the response from creating an app.
    $scope.handleAppCreated = function (data, status) {
	console.log (data);
	data.creationDate = new Date ();
        $scope.apps.push (data);
    };

});
