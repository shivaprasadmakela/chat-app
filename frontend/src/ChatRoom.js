import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import "./ChatRoom.css";
import { FiCopy, FiCheck, FiLogOut, FiSmile } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const socket = io("https://chat-app-lzrv.onrender.com");

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const onMsg = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on("message", onMsg);
    return () => socket.off("message", onMsg);
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName && !joined) {
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

  setInterval(() => {
    socket.emit("ping");
  }, 20000);

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

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
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
            <img
              src="/message-more.png"
              alt="No messages"
              className="no-msg-img"
            />
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

        {showEmojiPicker && (
          <div className="emoji-picker" ref={emojiRef}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <button
          className="btn emoji"
          ref={emojiBtnRef}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <FiSmile />
        </button>

        <button className="btn send" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}
