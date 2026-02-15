import { io } from 'socket.io-client';

// Use environment variable for production, fallback to localhost for development
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
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
