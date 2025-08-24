// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });


io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("message", { name: `${name}`, text: "joined" ,  ts: Date.now()});
  });

  socket.on("send-message", ({ roomId, name, text }) => {
    io.to(roomId).emit("message", { name, text , ts: Date.now()});
  });

  socket.on("leave-room", ({ roomId, name }) => {
    socket.leave(roomId);
    socket.to(roomId).emit("message", { name: `${name}`, text:  "left",  ts: Date.now() });
  });
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));
