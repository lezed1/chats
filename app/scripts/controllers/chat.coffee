@ChatCtrl = ($scope, socket) ->
  $scope.messageArray = []
  $scope.sendMessage = ->
    messageObject =
      username: $scope.username
      text: $scope.messageText

    if messageObject.username and messageObject.text
      $scope.messageArray.push messageObject
      $scope.messageText = ""
      socket.emit "message", messageObject

  socket.on "message", (messageObject) ->
    $scope.messageArray.push messageObject
