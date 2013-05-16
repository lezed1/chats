express = require('express')
dist_server = require('./dist/express.js')

dist_server.use(express.static('dist/'))
dist_server.listen(process.env.PORT || 9000)