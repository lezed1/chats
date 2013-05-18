express = require("express")
app = express()
server = require("http").createServer(app)
io = require("socket.io").listen(server)

io.configure ->
  io.set "transports", ["xhr-polling"]
  io.set "polling duration", 10

io.sockets.on "connection", (socket) ->
  socket.on "message", (data) ->
    console.log data
    socket.broadcast.emit "message", data

io.set('log level', 2)

if (process.env != 'production')
	app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet)

app.use(express.favicon('dist/favicon.ico'))

exports = module.exports = server

# delegates user() function
exports.use = ->
  app.use.apply app, arguments