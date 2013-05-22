(function() {
  exports.config = function(io) {
    io.configure(function() {
      io.set("transports", ["xhr-polling"]);
      return io.set("polling duration", 10);
    });
    io.sockets.on("connection", function(socket) {
      socket.on("message", function(data) {
        console.log(data);
        return socket.broadcast.emit("message", data);
      });
      socket.on("subscribe", function(data) {
        console.log(data);
        return socket.broadcast.emit("subscribe", data);
      });
      return socket.on("disconnect", function(data) {
        console.log(data);
        return socket.broadcast.emit("unsubscribe", data);
      });
    });
    io.set('log level', 2);
    return io;
  };

}).call(this);
