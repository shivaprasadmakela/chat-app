import { useState, useEffect } from 'react';
import useSocket from '../../../shared/hooks/useSocket';

export default function useChat(roomId, username) {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket]);

  const joinRoom = (name) => {
    if (!name?.trim() || !roomId) return;
    
    socket.emit('join-room', { roomId, name });
    setJoined(true);
  };

  const leaveRoom = (name) => {
    if (!name || !roomId) return;
    
    socket.emit('leave-room', { roomId, name });
    setJoined(false);
    setMessages([]);
  };

  const sendMessage = (name, text) => {
    if (!text?.trim() || !name || !roomId) return;
    
    socket.emit('send-message', { roomId, name, text });
  };

  return {
    messages,
    joined,
    setJoined,
    joinRoom,
    leaveRoom,
    sendMessage,
  };
}
