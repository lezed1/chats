"use strict"
angular.module("lezed1ChatYeomanApp", ["chat.services"]).config(($routeProvider) ->
  $routeProvider.otherwise(
    templateUrl: "views/chat.html"
    controller: "ChatCtrl"
  )
)
# CONTROLLERS:
.controller('ChatCtrl', ($scope, $location, localStorageService, socket) ->
  room = $location.path().split('/')[1]
  $scope.messageArray = []
  $scope.roomList = {
    'lezed1' : {
      name: 'lezed1'
    }
  }

  for i in [1..10]
    $scope.messageArray.push({
      username: 'lezed1-test'
      text: 'test: ' + i
      timestamp: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    })

  $scope.sendMessage = ->
    date = new Date()
    messageObject =
      username: $scope.username
      text: $scope.messageText
      timestamp: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    if messageObject.username and messageObject.text
      $scope.messageArray.push messageObject
      $scope.messageText = ""
      socket.emit "message", messageObject

  socket.on "message", (messageObject) ->
    $scope.messageArray.push messageObject)
