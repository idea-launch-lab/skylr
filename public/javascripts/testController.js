/*global todomvc, angular */
'use strict';

/**
 * Test controller - simulate a client application.
 */
LASApp.controller ('testController', function TestController ($scope, dataService, socket) {

    // Controller data members.
    $scope.title = "App Simulator";
    $scope.messageLoop = null;
    $scope.running = false;
    $scope.index = 0;
    $scope.category = 0;

    /**
     * Start the message loop.
     */
    $scope.startMessageLoop = function () {
	$scope.stopMessageLoop ();
	$scope.messageLoop =
	    setInterval (function() {
		$scope.$apply ($scope.addFile ());
	    }, 10); //Math.random (0, 1000));
    };

    /**
     * Stop the message loop.
     */
    $scope.stopMessageLoop = function () {
	if ($scope.messageLoop != null) {
	    clearInterval ($scope.messageLoop);
	    $scope.messageLoop = null;
	}
    };

    /**
     * Toggle the message loop's running state.
     */
    $scope.toggleMessageLoop = function () {
	/*
	$scope.addFile ();
    return;
*/
	$scope.messageLoop === null ?
	    $scope.startMessageLoop () :
	    $scope.stopMessageLoop ();
    };

    /**
     * Add a file.
     */
    $scope.addFile = function () {
	var id = $scope.index++;

	if (id % 3 == 0) {
	    $scope.category = 1;
	} else if (id % 4 == 0) {
	    $scope.category = 2;
	} else if (id % 8 == 0) {
	    $scope.category = 3;
	} else if (id % 6 == 0) {
	    $scope.category = 4;
	} else if (id % 5 == 0) {
	    $scope.category = 5;
	}
	
	var message = {
	    id       : id,
	    code     : random (0, 10000),
	    name     : $scope.name,
	    date     : new Date (),
	    filename : [ 'file-', id ].join (''),
	    content  : id
	};
	dataService.addFile (message, socket);
	//console.log ("dataService.addFile (message);");
	console.log ("."); //dataService.addFile (message);");
	// notify server side instead.
	// $scope.sendMessage (message);
    };

});
