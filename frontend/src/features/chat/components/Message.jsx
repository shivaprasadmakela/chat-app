import React from 'react';
import styles from './Message.module.css';

export default function Message({ message, isCurrentUser }) {
  const formattedTime = new Date(message.ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`${styles.message} ${isCurrentUser ? styles.me : styles.other}`}>
      <span className={styles.sender}>{message.name}</span>
      <div className={styles.text}>{message.text}</div>
      <span className={styles.timestamp}>{formattedTime}</span>
    </div>
  );
}
