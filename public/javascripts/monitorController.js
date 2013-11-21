/*global todomvc, angular */
'use strict';

/**
 * The event controller.
 */
LASApp.controller ('monitorController', function MonitorController ($scope,
										$log,
										$http,
										dataService,
										socket,
										charts) {
    $scope.title = "Monitoring";
    function initChart () {
	try {
	    initHost ('messageThroughputChart');
	} catch (e) {
	    console.log ('unable to initialize chart');
	}
    }    
    initChart ();
    
    // event list
    $scope.index = 0;
    $scope.value = '';
    $scope.messages = [ ];
    $scope.maxItemsLength = 5;
    $scope.users = [];
    
    // chart
    $scope.messageLoop = null;
    $scope.messagesByCategory = {};
    $scope.latestMessages = [];
    $scope.categorizeMessage = function (message) {
	var category = 0;
	if (message.code % 3 == 0) {
	    category = 1;
	} else if (message.code % 4 == 0) {
	    category = 2;
	} else if (message.code % 5 == 0) {
	    category = 3;
	}
	$log.debug ("incrementing value for category: " + category);
	var value = null;
	if ($scope.messagesByCategory.hasOwnProperty (category)) {
	    value = $scope.messagesByCategory [category];
	    value++;
	    $scope.messagesByCategory [category] = value;
	} else {
	    $scope.messagesByCategory [category] = 1;
	}
    };

    $scope.chartMessages = function (time) {
	for (var c = 0; c < $scope.latestMessages.length; c++) {
	    $scope.categorizeMessage ($scope.latestMessages [c]);
	}
	time = time - 1000;
	for (var key in $scope.messagesByCategory) {
	    var value = $scope.messagesByCategory [key];
	    charts.addData (key, time, value * 10000); 
	}
	$scope.latestMessages.length = 0;
	$scope.messagesByCategory = {};
    };
    setInterval(function() {
	$scope.chartMessages (new Date ().getTime ());
    }, 1000);

    $scope.addMessage = function (message) {
	$scope.messages.push (message);
	if ($scope.messages.length > $scope.maxItemsLength) {
	    var indexToRemove = 0;
	    var numberToRemove = 1;
	    $scope.messages.splice (indexToRemove, numberToRemove);
        }
	$scope.latestMessages.push (message);
    };

    // Socket listeners
    // ================

    socket.on('init', function (data) {
	$scope.name = "awesome";
    });

    socket.on('send:message', function (message) {
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
