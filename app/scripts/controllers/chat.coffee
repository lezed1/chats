@ChatCtrl = ($scope, $location, socket) ->
  $scope.messageArray = []
  $scope.roomArray = [{name: 'lezed1'}]

  # for i in [1..10]
  #   $scope.messageArray.push({
  #     username: 'lezed1-test'
  #     text: 'test: ' + i
  #   })

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
    $scope.messageArray.push messageObject