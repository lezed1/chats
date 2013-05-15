app = require("express")()
server = require("http").createServer(app)
io = require("socket.io").listen(server)

io.configure ->
  io.set "transports", ["xhr-polling"]
  io.set "polling duration", 10

io.sockets.on "connection", (socket) ->
  socket.on "message", (data) ->
    console.log data
    socket.broadcast.emit "message", data

exports = module.exports = server

# delegates user() function
exports.use = ->
  app.use.apply app, arguments