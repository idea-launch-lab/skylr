/*global angular */
/*jshint unused:false */
'use strict';

/**
 * Load dependencies
 *
 */
requirejs.config({
    //To get timely, correct error triggers in IE, force a define/shim exports check.
    //enforceDefine: true,
    paths: {
        jquery: [
	    "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",
	    "javascripts/libs/jquery-1.10.2.min"
        ],
	angular : [
	    "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js",
	    "javascripts/lib/angular-1.2.0.min"
	],
	socketio    : "components/socket.io-client/dist/socket.io",
	app         : "javascripts/app",
	dataAPI     : "javascripts/dataService",
	socket      : "javascripts/socket",
	smoothie    : "javascripts/lib/smoothie",
	chart       : "javascripts/chart",
	messageCtrl : "javascripts/messageController" 
    }
});

require ( ['jquery', 'angular', 'socketio', 
	   'app', 'dataAPI', 'socket', 'smoothie', 
	   'chart', 'messageCtrl' ], 
	  function ($) {
	  });

