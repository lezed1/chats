express = require "express"
app = express()
server = require("http").createServer(app)
io = require("socket.io").listen(server)
config = require './configSocket'

io = config.config io

if (process.env.NODE_ENV != 'production')
  try
    app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet)
  catch e
    console.log e

app.use(express.favicon('Public/favicon.ico'))

exports = module.exports = server

# delegates use() function
exports.use = ->
  app.use.apply app, arguments