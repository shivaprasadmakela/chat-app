import React from 'react';
import styles from './Card.module.css';

export default function Card({
  children,
  variant = 'default',
  padding = 'medium',
  className = '',
}) {
  const classNames = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
}
