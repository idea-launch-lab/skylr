/*global angular */
/*jshint unused:false */
'use strict';

function random (min, max) { 
   return Math.round (min + Math.random () * (max - min)) 
}

/**
 * The main LAS Instrumentation app module.
 *
 * @type {angular.Module}
 */
var LASApp = 
    angular.module ('LASApp',
		    [ 'ngRoute' ],
		    function ($interpolateProvider) {
			$interpolateProvider.startSymbol ('[[');
			$interpolateProvider.endSymbol (']]');
		    }).
    config (function ($logProvider) {
	$logProvider.debugEnabled (false);
    });

LASApp.config (['$routeProvider', function ($routeProvider) {
    $routeProvider.
	when ('/admin', {
            templateUrl : 'partials/admin.html',
            controller  : 'adminController'
	}).
	when ('/monitor', {
            templateUrl : 'partials/monitor.html',
            controller  : 'monitorController'
	}).
	when ('/analytics', {
            templateUrl : 'partials/analytics.html',
            controller  : 'analyticsController'
	}).
	when ('/test', {
            templateUrl : 'partials/test.html',
            controller  : 'testController'
	}).
	otherwise({
            redirectTo: '/'
	});
}]);
