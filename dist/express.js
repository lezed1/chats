(function() {
  var app, config, e, exports, express, io, server;

  express = require("express");

  app = express();

  server = require("http").createServer(app);

  io = require("socket.io").listen(server);

  config = require('./configSocket');

  config.config(io);

  if (process.env.NODE_ENV !== 'production') {
    try {
      app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
    } catch (_error) {
      e = _error;
      console.log(e);
    }
  }

  app.use(express.favicon(__dirname + '/Public/favicon.ico'));

  exports = module.exports = server;

  exports.use = function() {
    return app.use.apply(app, arguments);
  };

}).call(this);
