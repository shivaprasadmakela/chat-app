import React from 'react';
import { FiCopy, FiCheck, FiLogOut } from 'react-icons/fi';
import Button from '../../../shared/components/Button/Button';
import styles from './ChatHeader.module.css';

export default function ChatHeader({ roomId, username, copied, onCopyLink, onLeave }) {
  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <h3 className={styles.welcome}>Welcome! {username}</h3>
        <p className={styles.roomId}>Room: {roomId}</p>
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="small"
          icon={copied ? <FiCheck /> : <FiCopy />}
          onClick={onCopyLink}
          className={styles.copyBtn}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>

        <Button
          variant="ghost"
          size="small"
          icon={<FiLogOut />}
          onClick={onLeave}
          className={styles.leaveBtn}
        >
          Exit Room
        </Button>
      </div>
    </div>
  );
}
