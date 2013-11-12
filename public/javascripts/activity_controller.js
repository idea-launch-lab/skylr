/*global todomvc, angular */
'use strict';

instrumentationApp.factory ('instrumentationService', function ($http) {
   return {
        sendEvent: function () {
             return $http.get ('/file/add')
                       .then (function (result) {
                            return ''; //result.data;
                        });
        }
   }
});


/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
instrumentationApp.controller ('eventController', function InlineEditorController ($scope){

    // $scope is a special object that makes
    // its properties available to the view as
    // variables. Here we set some default values:

    $scope.showtooltip = false;
    $scope.value = 'Edit me.';
    $scope.items = [ ];
    $scope.maxItemsLength = 5;
    $scope.index = 0;

    // Some helper functions that will be
    // available in the angular declarations

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
