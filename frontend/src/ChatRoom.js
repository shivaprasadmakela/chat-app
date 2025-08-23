import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

const socket = io("https://chat-app-lzrv.onrender.com");

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  // Subscribe to messages (no history)
  useEffect(() => {
    const onMsg = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("message", onMsg);
    return () => {
      socket.off("message", onMsg);
    };
  }, []);

  // Auto-join on mount if we have a stored name
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setName(savedName);
      // keep them in current room and join silently
      localStorage.setItem("roomId", roomId);
      socket.emit("join-room", { roomId, name: savedName });
      setJoined(true);
      // DO NOT load any history — messages start empty after refresh by design
    }
  }, [roomId]);

  const joinRoom = () => {
    if (!name.trim()) return;
    // remember for future refreshes
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
      <div className="container center">
        <input
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" onClick={joinRoom}>Join Chat</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{name}</h2>
        <div className="header-buttons">
          <button className="btn copy" onClick={copyLink}>
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button className="btn leave" onClick={leaveRoom}>Exit Room</button>
        </div>
      </div>

      <div className="chat-box">
        {messages.map((m, i) => (
          <p key={i}><b>{m.name}:</b> {m.text}</p>
        ))}
      </div>

      <div className="chat-input">
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
