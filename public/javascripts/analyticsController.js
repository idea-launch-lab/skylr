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
	    //console.log (result.data);
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
	var totalMessages = "total messages: 0";

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
    $scope.startTime = null;
    $scope.initialMessageCount = null;

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
	$scope.startTime = new Date ().getTime ();
	$scope.totalMessages = null;

	// update chart after specified interval
	var updateInterval = 1000;  // milliseconds	
	$scope.chartUpdateLoop = setInterval (function () {
	    $scope.query ($scope.updateChart);
	}, updateInterval);
    };
    $scope.updateChart = function (state) {
	if (state !== null && state !== undefined) {
	    var c = 0;
	    $scope.chartData [c++].y = state.event.imps;
	    $scope.chartData [c++].y = state.event.rows;
	    $scope.chartData [c++].y = state.event.code;
	    $scope.chartData [c++].y = state.event.code2;
	    
	    var sum = state.event.rows;
	    
	    var currentTime = new Date ().getTime ();
	    var rate = 0;
	    if ($scope.initialMessageCount === null) {
		$scope.initialMessageCount = sum;
		$scope.startTime = currentTime;
	    } else {
		var elapsedTime = currentTime - $scope.startTime;
		var newMessages = sum - $scope.initialMessageCount;
		rate = Math.round (newMessages / (elapsedTime / 1000));
	    }
	    
	    $scope.chart.options.data[0].legendText =
		[ "total messages: ", sum, '; Throughput: ', rate, ' messages/second' ].join ('');
	    
	    $scope.chart.render();
	}
    };


    $scope.buildTree = function () {
	/*
	$(function () {
	    // TO CREATE AN INSTANCE
	    // select the tree container using jQuery
	    $("#tree")
	    // call `.jstree` with the options object
		.jstree({
		    // the `plugins` array allows you to configure the active plugins on this instance
		    "plugins" : ["themes","html_data","ui","crrm","hotkeys"],
		    // each plugin you have included can have its own config object
		    "core" : { "initially_open" : [ "phtml_1" ] }
		    // it makes sense to configure a plugin only if overriding the defaults
		})
	    // EVENTS
	    // each instance triggers its own events - to process those listen on the container
	    // all events are in the `.jstree` namespace
	    // so listen for `function_name`.`jstree` - you can function names from the docs
		.bind("loaded.jstree", function (event, data) {
		    // you get two params - event & data - check the core docs for a detailed description
		});
	    // INSTANCES
	    // 1) you can call most functions just by selecting the container and calling `.jstree("func",`
	    setTimeout(function () { $("#tree").jstree("set_focus"); }, 500);
	    // with the methods below you can call even private functions (prefixed with `_`)
	    // 2) you can get the focused instance using `$.jstree._focused()`. 
	    setTimeout(function () { $.jstree._focused().select_node("#phtml_1"); }, 1000);
	    // 3) you can use $.jstree._reference - just pass the container, a node inside it, or a selector
	    setTimeout(function () { $.jstree._reference("#phtml_1").close_node("#phtml_1"); }, 1500);
	    // 4) when you are working with an event you can use a shortcut
	    $("#tree").bind("open_node.jstree", function (e, data) {
		// data.inst is the instance which triggered this event
		data.inst.select_node("#phtml_2", true);
	    });
	    setTimeout(function () { $.jstree._reference("#phtml_1").open_node("#phtml_1"); }, 2500);
	});
*/
    };


});
