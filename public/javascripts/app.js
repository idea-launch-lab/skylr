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
		    [ ],
		    function ($interpolateProvider) {
			$interpolateProvider.startSymbol ('[[');
			$interpolateProvider.endSymbol (']]');
		    }).
    config (function ($logProvider) {
	$logProvider.debugEnabled (false);
    });

angular.element(document).ready (function() {
    initChart ();
    x ();
});

function x () {
$('#applicationTable').dataTable({
    "aaData": [
        [ "Default", "lkhaksjfkbnvakjhsd", "Default application", new Date (), "0.0.1" ]
    ],
    "aoColumns": [
        { "sTitle": "Name" },
        { "sTitle": "Identifier" },
        { "sTitle": "Description" },
        { "sTitle": "Created" },
        { "sTitle": "Version" }
    ]
    });
}
