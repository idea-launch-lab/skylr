/*global todomvc, angular */
'use strict';

/**
 * The event controller.
 */
LASApp.controller ('analyticsController', function AnalyticsController ($scope, $log, dataService) {

    // Controller data members
    $scope.title = "Analytics";
    $scope.storageChannels = dataService.getStorageChannels ();
    $scope.storageChannel = $scope.storageChannels [2];
    $scope.status = [ ];

    // Execute query
    $scope.query = function () {
	var queryObj = $scope.queries [$scope.storageChannel.name];
	var query = dataService.query (queryObj.uri, queryObj.query);
	query.then (function (result) {
	    console.log (result.data);
	    $scope.status = result.data [0];
	});
    };
    
    // Queries by storage channel
    $scope.queries = {
	'Kafka/Druid' : {
	    name  : 'OLAP - via Kafka/Druid',
	    uri   : '/api/data/olap/query',
	    query : {
		"queryType"    : "groupBy",
		"dataSource"   : "druidtest",
		"granularity"  : "all",
		"dimensions"   : [ ],
		"aggregations" : [
		    { "type" : "count", "name": "rows" },
		    { "type" : "longSum", "name": "imps", "fieldName": "impressions" },
		    { "type" : "doubleSum", "name": "wp", "fieldName": "wp" }
		],
		"intervals": [ "2010-01-01T00:00/2020-01-01T00" ]
	    }
	}
    };
});
