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
    $scope.query = function (callback) {
	var queryObj = $scope.queries [$scope.storageChannel.name];
	var query = dataService.query (queryObj.uri, queryObj.query);
	query.then (function (result) {
	    console.log (result.data);
	    $scope.status = result.data [0];
	    if (callback) {
		callback ($scope.status);
	    }
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
		    { "type" : "longSum", "name": "code", "fieldName": "code" },
		    { "type" : "longSum", "name": "code2", "fieldName": "code2" }
		],
		"intervals": [ "2010-01-01T00:00/2020-01-01T00" ]
	    }
	}
    };

    $scope.chartData = [
	{ label : "#Messages", y : 0 },
	{ label : "Count",     y : 0 },
	{ label : "Code-1",    y : 0 },
	{ label : "Code-2",    y : 0 }
    ];
    $scope.chart = null;
    $scope.initChart = function () {
	// initial values of dataPoints
	var totalMessages = "total people on campus: 0";

	$scope.chart = new CanvasJS.Chart("chartContainer",{
	    theme: "theme2",
	    title:{ 
		text: "Message Throughput Statistics"
	    },
	    axisY: {				
		title: "Count (Total #)"
	    },
	    legend:{
		verticalAlign: "top",
		horizontalAlign: "centre",
		fontSize: 18
	    },
	    data : [{
		type: "column",
		showInLegend: true,
		legendMarkerType: "none",
		legendText: totalMessages,
		indexLabel: "{y}",
		dataPoints: $scope.chartData
	    }]
	});

	// renders initial chart
	$scope.chart.render();
    };

    $scope.chartUpdateLoop = null;

    /**
     * Toggle the message loop's running state.
     */
    $scope.toggleChartUpdateLoop = function () {
	$scope.chartUpdateLoop === null ?
	    $scope.startChartUpdateLoop () :
	    $scope.stopChartUpdateLoop ();
    };
    $scope.stopChartUpdateLoop = function () {
	if ($scope.chartUpdateLoop !== null) {
	    clearInterval ($scope.chartUpdateLoop);
	    $scope.chartUpdateLoop = null;
	}
    };
    $scope.startChartUpdateLoop = function () {
	$scope.stopChartUpdateLoop ();

	// update chart after specified interval
	var updateInterval = 1000;  // milliseconds	
	$scope.chartUpdateLoop = setInterval (function () {
	    $scope.query ($scope.updateChart);
	}, updateInterval);
    };
    $scope.updateChart = function (state) {
	var c = 0;
	$scope.chartData [c++].y = state.event.imps;
	$scope.chartData [c++].y = state.event.rows;
	$scope.chartData [c++].y = state.event.code;
	$scope.chartData [c++].y = state.event.code2;
	
	var sum = 0;
	for (var c = 0; c < 4; c++) {
	    sum += $scope.chartData [c].y;
	}
	
	var totalMessages = "total messages: " + sum;
	$scope.chart.options.data[0].legendText = totalMessages;
	$scope.chart.render();
    };

});
