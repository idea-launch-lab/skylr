/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
instrumentationApp.controller ('eventController', function MessageController ($scope, dataService, socket){
    $scope.showtooltip = false;
    $scope.index = 0;
    $scope.value = '';
    $scope.messages = [ ];
    $scope.maxItemsLength = 5;
    $scope.users = [];

    $scope.addFile = function () {
	var id = $scope.index++;
	var message = {
	    id       : id,
	    name     : $scope.name,
	    date     : new Date (),
	    filename : [ 'file-', id ].join (''),
	    content  : $scope.value
	};
	dataService.addFile (message);
	$scope.sendMessage (message);
    };

    $scope.addMessage = function (message) {
	$scope.messages.push (message);
	if ($scope.messages.length > $scope.maxItemsLength) {
	    var indexToRemove = 0;
	    var numberToRemove = 1;
	    $scope.messages.splice (indexToRemove, numberToRemove);
        }
    };

    // Socket listeners
    // ================

    socket.on('init', function (data) {
	$scope.name = "awesome";
    });

    socket.on('send:message', function (message) {
	console.log (message);
	$scope.addMessage (message);
    });

    socket.on('user:join', function (data) {
	$scope.users.push (data)
    });

    // add a message to the conversation when a user disconnects or leaves the room
    socket.on('user:left', function (data) {
	var i, user;
	for (i = 0; i < $scope.users.length; i++) {
	    user = $scope.users[i];
	    if (user === data) {
		$scope.users.splice (i, 1);
		break;
	    }
	}
    });

    // Methods published to the scope
    // ==============================

    $scope.sendMessage = function (message) {
	socket.emit('send:message', message);

	// add the message to our model locally
	$scope.addMessage (message);

	// clear message box
	$scope.value = '';
    };

});
