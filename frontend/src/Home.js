import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

const handleCreaterRoom = () => {
navigate("/create-room");
}

  return (
    <div className="homepage">
      <div className="header">
        <div className="icon">💬</div>
        <h1>Private Chat</h1>
        <p>
          Create instant private chat rooms. No accounts, no history. Just pure,
          temporary conversations.
        </p>
      </div>

      <div className="features">
        <div className="feature-card">
          <span className="emoji">⚡</span>
          <h3>Instant Setup</h3>
          <p>
            Create a room in seconds. Share the link and start chatting
            immediately.
          </p>
        </div>

        <div className="feature-card">
          <span className="emoji">👤</span>
          <h3>No Registration</h3>
          <p>
            Just enter your name and start chatting. No emails, passwords, or
            accounts needed.
          </p>
        </div>

        <div className="feature-card">
          <span className="emoji">💭</span>
          <h3>Truly Private</h3>
          <p>
            Messages disappear when you close the tab. No databases, no
            tracking, no history.
          </p>
        </div>
      </div>

      <button className="create-btn" onClick={handleCreaterRoom}>Create Chat Room</button>
      <p className="footer-text">
        Free • Private • No Registration Required
      </p>
    </div>
  );
};

