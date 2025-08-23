// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// No room-level message storage at all.
// Each client maintains its own in-memory view.

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("message", { name: `${name}`, text: "joined" });
  });

  socket.on("send-message", ({ roomId, name, text }) => {
    io.to(roomId).emit("message", { name, text }); // only broadcast
  });

  socket.on("leave-room", ({ roomId, name }) => {
    socket.leave(roomId);
    socket.to(roomId).emit("message", { name: `${name}`, text:  left });
  });
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));
