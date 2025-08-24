import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./JoinChat.css";

export default function JoinChat() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const createRoom = () => {
    const newRoomId = uuidv4().slice(0, 6); // shorter id
    localStorage.setItem("roomId", newRoomId);
    localStorage.setItem("username", name || "Guest");
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="join-page">
      <div className="join-card">
        <div className="icon">👤</div>
        <h2>Join Chat Room</h2>
        <p>Enter your details to continue</p>

        <input
          type="text"
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="join-btn" onClick={createRoom}>
          Create Room
        </button>

      </div>
    </div>
  );
}
