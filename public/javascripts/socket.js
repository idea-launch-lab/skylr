/*global angular */
/*jshint unused:false */
'use strict';

// http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/

var socket = io.connect('http://scox.europa.renci.org:3000');

instrumentationApp.factory ('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
