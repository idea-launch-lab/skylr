/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
instrumentationApp.controller ('eventController', function InlineEditorController ($scope, dataService){

    $scope.showtooltip = false;
    $scope.value = 'Edit me.';
    $scope.items = [ ];
    $scope.maxItemsLength = 5;
    $scope.index = 0;

    $scope.hideTooltip = function(){

	// When a model is changed, the view will be automatically
	// updated by by AngularJS. In this case it will hide the tooltip.

	$scope.showtooltip = false;
    }

    $scope.toggleTooltip = function(e){
	e.stopPropagation();
	$scope.showtooltip = !$scope.showtooltip;
    }

    $scope.go = function () {

	dataService.addFile ({ filename : 'fn', content : 'data....' });

	$scope.index++;
        $scope.items.push ({
	    id      : $scope.index,
            data    : new Date (),
            details : 'dets[' + $scope.index + ']'
        });

	if ($scope.items.length > $scope.maxItemsLength) {
	    var indexToRemove = 0;
	    var numberToRemove = 1;
	    $scope.items.splice (indexToRemove, numberToRemove);
        }
    }

});
