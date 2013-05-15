angular.module("chat.services", [])
.value("version", "0.0.1")
.factory "socket", ($rootScope) ->
    socket = io.connect(window.location.protocol + document.domain)
    on: (eventName, callback) ->
        socket.on eventName, ->
            args = arguments
            $rootScope.$apply ->
                callback.apply socket, args

    emit: (eventName, data, callback) ->
        socket.emit eventName, data, ->
            args = arguments
            $rootScope.apply ->
                callback.apply socket, args  if callback

