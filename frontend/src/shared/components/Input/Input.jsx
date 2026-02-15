import React from 'react';
import styles from './Input.module.css';

export default function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  disabled = false,
  className = '',
  onKeyDown,
  ...rest
}) {
  const classNames = [
    styles.input,
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        className={classNames}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
