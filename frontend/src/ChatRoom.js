import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatRoom.css";
import { FiCopy, FiCheck, FiLogOut } from "react-icons/fi";

const socket = io("https://chat-app-lzrv.onrender.com");

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  // Subscribe to new messages
  useEffect(() => {
    const onMsg = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("message", onMsg);
    return () => socket.off("message", onMsg);
  }, []);

  // Auto join if name stored
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName && !joined) {
      // ✅ prevent duplicate emits
      setName(savedName);
      localStorage.setItem("roomId", roomId);
      socket.emit("join-room", { roomId, name: savedName });
      setJoined(true);
    }
  }, [roomId, joined]);

  const joinRoom = () => {
    if (!name.trim()) return;
    localStorage.setItem("username", name);
    localStorage.setItem("roomId", roomId);
    socket.emit("join-room", { roomId, name });
    setJoined(true);
  };

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("send-message", { roomId, name, text });
      setText("");
    }
  };

  const leaveRoom = () => {
    socket.emit("leave-room", { roomId, name });
    localStorage.removeItem("username");
    localStorage.removeItem("roomId");
    navigate("/");
  };

  const copyLink = () => {
    const link = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!joined) {
    return (
      <div className="join-page">
        <div className="join-card">
<img src="/relation.png" alt="Chat Icon" className="logo-relations" />  
          <h2>Join Chat Room</h2>
          <h5>{roomId}</h5>
          <p>Enter your details to continue</p>

          <input
            type="text"
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="join-btn" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
       <div className="header-text">
         <h3>Welcome! {name}</h3>
        <p>Room: {roomId}</p>
       </div>
        
        <div className="header-buttons">
          <button className="btn copy" onClick={copyLink}>
            {copied ? (
              <>
                <FiCheck /> Copied!
              </>
            ) : (
              <>
                <FiCopy /> Copy Link
              </>
            )}
          </button>

          <button className="btn leave" onClick={leaveRoom}>
            <FiLogOut /> Exit Room
          </button>
        </div>
      </div>

      {/* Messages */}
<div className="chat-box">
  {messages.length === 0 ? (
    <div className="no-messages">
      <img src="/message-more.png" alt="No messages" className="no-msg-img" />
      <p>No messages yet. Start the conversation!</p>
    </div>
  ) : (
    messages.map((m, i) => (
      <div
        key={i}
        className={`message ${m.name === name ? "me" : "other"}`}
      >
        <span className="sender">{m.name}</span>
        <h5 className="text">{m.text}</h5>
        <span className="sender">
          {new Date(m.ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    ))
  )}
</div>


      {/* Input */}
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn send" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}
