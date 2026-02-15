import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import Button from '../../shared/components/Button/Button';
import Input from '../../shared/components/Input/Input';
import Card from '../../shared/components/Card/Card';
import styles from './JoinChat.module.css';

export default function JoinChat() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const createRoom = () => {
    const newRoomId = uuidv4().slice(0, 6);
    localStorage.setItem('roomId', newRoomId);
    localStorage.setItem('username', name || 'Guest');
    navigate(`/room/${newRoomId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createRoom();
    }
  };

  return (
    <div className={styles.joinPage}>
      <div className={styles.container}>
        <Card variant="elevated" padding="large" className={styles.card}>
          <div className={styles.logoWrapper}>
            <FiUsers className={styles.logo} />
          </div>
          <h2 className={styles.title}>Join Chat Room</h2>
          <p className={styles.subtitle}>Enter your details to continue</p>

          <div className={styles.formGroup}>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <Button onClick={createRoom} size="large" className={styles.button}>
            Create Room
          </Button>
        </Card>
      </div>
    </div>
  );
}
