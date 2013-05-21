exports.config = (io) ->
	io.configure ->
    io.set "transports", ["xhr-polling"]
    io.set "polling duration", 10

  io.sockets.on "connection", (socket) ->
    socket.on "message", (data) ->
      console.log data
      socket.broadcast.emit "message", data

  io.set('log level', 2)

  return io