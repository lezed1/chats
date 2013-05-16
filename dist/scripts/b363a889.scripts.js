(function () {
  'use strict';
  angular.module('lezed1ChatYeomanApp', ['chat.services']).config([
    '$routeProvider',
    function ($routeProvider) {
      return $routeProvider.otherwise({
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      });
    }
  ]);
}.call(this));
(function () {
  this.ChatCtrl = function ($scope, $location, socket) {
    $scope.messageArray = [];
    $scope.roomArray = [{ name: 'lezed1' }];
    $scope.sendMessage = function () {
      var date, messageObject;
      date = new Date();
      messageObject = {
        username: $scope.username,
        text: $scope.messageText,
        timestamp: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      };
      if (messageObject.username && messageObject.text) {
        $scope.messageArray.push(messageObject);
        $scope.messageText = '';
        return socket.emit('message', messageObject);
      }
    };
    return socket.on('message', function (messageObject) {
      return $scope.messageArray.push(messageObject);
    });
  };
}.call(this));
(function () {
  angular.module('chat.services', []).value('version', '0.0.1').factory('socket', [
    '$rootScope',
    function ($rootScope) {
      var socket;
      socket = io.connect(window.location.protocol + document.domain);
      return {
        on: function (eventName, callback) {
          return socket.on(eventName, function () {
            var args;
            args = arguments;
            return $rootScope.$apply(function () {
              return callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          return socket.emit(eventName, data, function () {
            var args;
            args = arguments;
            return $rootScope.apply(function () {
              if (callback) {
                return callback.apply(socket, args);
              }
            });
          });
        }
      };
    }
  ]);
}.call(this));