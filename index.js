const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const server = app.listen(4000, () => {
  console.log("listening to requests on port 4000");
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data); // broadcast message from on to all sockets
  });

  socket.on("typing", (data) => {
    // send data to all except the sender socket
    socket.broadcast.emit("typing", data);
  });
});
