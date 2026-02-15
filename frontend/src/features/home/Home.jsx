import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiUserCheck, FiShield } from 'react-icons/fi';
import Button from '../../shared/components/Button/Button';
import FeatureCard from './components/FeatureCard';
import styles from './Home.module.css';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export default function Home() {
  const navigate = useNavigate();
  const [serverWarming, setServerWarming] = useState(true);

  // Warm up the backend server on mount (prevents Cloud Run cold start)
  useEffect(() => {
    const warmUpServer = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/ping`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          console.log('✅ Backend server warmed up');
        }
      } catch (error) {
        console.warn('⚠️ Could not warm up server:', error.message);
      } finally {
        setServerWarming(false);
      }
    };

    warmUpServer();
  }, []);

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
