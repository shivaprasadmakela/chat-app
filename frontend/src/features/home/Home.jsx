import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiUserCheck, FiShield } from 'react-icons/fi';
import Button from '../../shared/components/Button/Button';
import FeatureCard from './components/FeatureCard';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <img src="/meetme.png" alt="Chat Icon" className={styles.logo} />
          </div>
          <h1 className={styles.title}>Talk Now With Private Chat</h1>
          <p className={styles.subtitle}>
            Create instant private chat rooms. No accounts, no history. Just pure,
            temporary conversations.
          </p>
        </div>

        <div className={styles.features}>
          <FeatureCard
            icon={<FiZap />}
            title="Instant Setup"
            description="Create a room in seconds. Share the link and start chatting immediately."
          />
          <FeatureCard
            icon={<FiUserCheck />}
            title="No Registration"
            description="Just enter your name and start chatting. No emails, passwords, or accounts needed."
          />
          <FeatureCard
            icon={<FiShield />}
            title="Truly Private"
            description="Messages disappear when you close the tab. No databases, no tracking, no history."
          />
        </div>

        <div className={styles.ctaSection}>
          <Button onClick={handleCreateRoom} size="large">
            Create Chat Room
          </Button>
          <p className={styles.footerText}>
            Free • Private • No Registration Required
          </p>
        </div>
      </div>
    </div>
  );
}
