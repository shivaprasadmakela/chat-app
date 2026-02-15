import React, { useState, useRef, useEffect } from 'react';
import { FiSmile } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';
import Button from '../../../shared/components/Button/Button';
import styles from './MessageInput.module.css';

export default function MessageInput({ value, onChange, onSend }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef(null);
  const emojiBtnRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    onChange({ target: { value: value + emojiData.emoji } });
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
        onKeyDown={handleKeyPress}
      />

      {showEmojiPicker && (
        <div className={styles.emojiPicker} ref={emojiRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <Button
        variant="ghost"
        size="small"
        icon={<FiSmile />}
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className={styles.emojiBtn}
        ref={emojiBtnRef}
      />

      <Button
        variant="primary"
        size="small"
        onClick={onSend}
        className={styles.sendBtn}
      >
        ➤
      </Button>
    </div>
  );
}
