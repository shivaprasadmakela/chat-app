import { io } from 'socket.io-client';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io('https://chat-app-lzrv.onrender.com', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
    
    // Keep connection alive with ping
    setInterval(() => {
      if (socket && socket.connected) {
        socket.emit('ping');
      }
    }, 20000);
  }
  
  return socket;
};
