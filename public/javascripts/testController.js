/*global todomvc, angular */
'use strict';

/**
 * Test controller - simulate a client application.
 */
LASApp.controller ('testController', function TestController ($scope, dataService, socketService) {

    // Controller data members.
    $scope.title = "App Simulator";
    $scope.messageLoop = null;
    $scope.running = false;
    $scope.index = 0;
    $scope.category = 0;
    $scope.docDB = true;
    $scope.storageChannels = [
	{ name : 'File',     uri : '/api/data/file/add' },
	{ name : 'Document', uri : '/api/data/document/add' },
	{ name : 'Kafka',    uri : '/api/data/kafka/add' } 
    ];
    $scope.storageChannel = $scope.storageChannels [0];

    /**
     * Start the message loop.
     */
    $scope.startMessageLoop = function () {
	$scope.stopMessageLoop ();
	$scope.messageLoop =
	    setInterval (function() {
		$scope.$apply ($scope.sendMessage ());
	    }, 10);
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
	$scope.messageLoop === null ?
	    $scope.startMessageLoop () :
	    $scope.stopMessageLoop ();
    };

    /**
     * Add a file.
     */
    $scope.sendMessage = function () {
	var id = random (0, 1000000); //$scope.index++;

	if (id % 8 == 0) {
	    $scope.category = 3;
	} else if (id % 6 == 0) {
	    $scope.category = 4;
	} else if (id % 5 == 0) {
	    $scope.category = 5;
	} else if (id % 4 == 0) {
	    $scope.category = 2;
	} else if (id % 3 == 0) {
	    $scope.category = 1;
	}
	
	var message = {
	    id       : id,
	    code     : id,
	    name     : $scope.name,
	    date     : new Date (),
	    filename : [ 'file-', id ].join (''),
	    content  : id
	};

	/**
	if ($scope.docDB) {
	    dataService.addEvent (message, socketService);
	} else {
	    dataService.addFile (message, socketService);
	}
	dataService.addBusEvent (message, socketService);
	*/
	dataService.addGenericEvent ($scope.storageChannel.uri,
				     message,
				     socketService);
    };

});
