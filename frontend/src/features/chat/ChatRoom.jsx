import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import useChat from './hooks/useChat';
import styles from './ChatRoom.module.css';

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const { messages, joined, setJoined, joinRoom, leaveRoom, sendMessage } = useChat(
    roomId,
    name
  );

  // Auto-join if username is saved in localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName && !joined) {
      setName(savedName);
      localStorage.setItem('roomId', roomId);
      joinRoom(savedName);
      setJoined(true);
    }
  }, [roomId, joined, joinRoom, setJoined]);

  const handleJoinRoom = () => {
    if (!name.trim()) return;
    localStorage.setItem('username', name);
    localStorage.setItem('roomId', roomId);
    joinRoom(name);
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      sendMessage(name, text);
      setText('');
    }
  };

  const handleLeaveRoom = () => {
    leaveRoom(name);
    localStorage.removeItem('username');
    localStorage.removeItem('roomId');
    navigate('/');
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Show join form if not joined
  if (!joined) {
    return (
      <div className={styles.joinPage}>
        <div className={styles.joinContainer}>
          <Card variant="elevated" padding="large" className={styles.joinCard}>
            <div className={styles.logoWrapper}>
            <FiMessageCircle className={styles.logo} />
            </div>
            <h2 className={styles.joinTitle}>Join Chat Room</h2>
            <h5 className={styles.joinRoomId}>{roomId}</h5>
            <p className={styles.joinSubtitle}>Enter your details to continue</p>

            <div className={styles.formGroup}>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
              />
            </div>

            <Button onClick={handleJoinRoom} size="large" className={styles.joinBtn}>
              Join Room
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Main chat interface
  return (
    <div className={styles.chatContainer}>
      <ChatHeader
        roomId={roomId}
        username={name}
        copied={copied}
        onCopyLink={handleCopyLink}
        onLeave={handleLeaveRoom}
      />

      <MessageList messages={messages} currentUser={name} />

      <MessageInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSend={handleSendMessage}
      />
    </div>
  );
}
