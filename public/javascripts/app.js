/*global angular */
/*jshint unused:false */
'use strict';


/**
 * The main LAS Instrumentation app module.
 *
 * @type {angular.Module}
 */
var instrumentationApp = 
    angular.module ('instrumentationApp',
		    [],
		    function ($interpolateProvider) {
			$interpolateProvider.startSymbol ('[[');
			$interpolateProvider.endSymbol (']]');
		    });

angular.element(document).ready (function() {
    initChart ();
});