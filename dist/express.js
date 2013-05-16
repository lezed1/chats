(function() {
  var app, exports, io, server;

  app = require("express")();

  server = require("http").createServer(app);

  io = require("socket.io").listen(server);

  io.configure(function() {
    io.set("transports", ["xhr-polling"]);
    return io.set("polling duration", 10);
  });

  io.sockets.on("connection", function(socket) {
    return socket.on("message", function(data) {
      console.log(data);
      return socket.broadcast.emit("message", data);
    });
  });

  io.set('log level', 2);

  exports = module.exports = server;

  exports.use = function() {
    return app.use.apply(app, arguments);
  };

}).call(this);
