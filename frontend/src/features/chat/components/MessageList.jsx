import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import Message from './Message';
import styles from './MessageList.module.css';

export default function MessageList({ messages, currentUser }) {
  if (messages.length === 0) {
    return (
      <div className={styles.messageList}>
        <div className={styles.emptyState}>
          <FiMessageSquare className={styles.emptyIcon} />
          <p className={styles.emptyText}>No messages yet. Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messageList}>
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          isCurrentUser={msg.name === currentUser}
        />
      ))}
    </div>
  );
}
