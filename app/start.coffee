express = require("express")
dist_server = require("./express.js")

port = process.env.PORT or 9000

dist_server.use express.static("dist/")
dist_server.listen port

console.log "Server running on port: " + port