/*global todomvc, angular */
'use strict';

/**
 * The event controller.
 */
LASApp.controller ('analyticsController', function AnalyticsController ($scope, $log, dataService) {
    $scope.storageChannels = [
	/*
	{
	    name  : 'File',
	    uri   : '/api/data/document/query',
	    query : 'file-*' 
	},
	{
	    name  : 'Document',
	    uri   : '/api/data/document/query',
	    query : '------TODO-------'
	},
*/
	{
	    name  : 'Kafka/Druid',
	    uri   : '/api/data/druid/query',
	    query : {
		"queryType"   : "groupBy",
		"dataSource"  : "druidtest",
		"granularity" : "all",
		"dimensions"  : [ ],
		"aggregations": [
		    { "type" : "count", "name": "rows" },
		    { "type" : "longSum", "name": "imps", "fieldName": "impressions"},
		    { "type" : "doubleSum", "name": "wp", "fieldName": "wp"}
		],
		"intervals": ["2010-01-01T00:00/2020-01-01T00"]
	    }
	}
    ];
    $scope.storageChannel = $scope.storageChannels [0];
    $scope.status = [ ];
    $scope.update = function () {
	$scope.status = dataService.query ($scope.storageChannel.uri,
					   $scope.storageChannel.query);
    };
});
