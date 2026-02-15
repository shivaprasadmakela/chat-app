// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Health check endpoint for monitoring and warming
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Socket.io server is running',
    timestamp: new Date().toISOString()
  });
});

// Ping endpoint for cold start warming
app.get('/ping', (req, res) => {
  res.json({ status: 'pong', timestamp: new Date().toISOString() });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  pingTimeout: 60000,   
  pingInterval: 25000,  
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.to(roomId).emit("message", {
      name: `${name}`,
      text: "joined",
      ts: Date.now(),
    });
  });

  socket.on("send-message", ({ roomId, name, text }) => {
    io.to(roomId).emit("message", { name, text, ts: Date.now() });
  });

  socket.on("leave-room", ({ roomId, name }) => {
    socket.leave(roomId);
    socket.to(roomId).emit("message", {
      name: `${name}`,
      text: "left",
      ts: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
