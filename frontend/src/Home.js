import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const createRoom = () => {
    const newRoomId = uuidv4();
    localStorage.setItem("roomId", newRoomId);
    localStorage.setItem("username", name || "Guest");
    navigate(`/room/${newRoomId}`);
  };

  const handleJoin = () => {
    if (!roomId.trim() || !name.trim()) return;
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("username", name);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="container center">
      <input
        className="input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Enter room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button className="btn" onClick={handleJoin}>
        Join Room
      </button>
      <button className="btn" onClick={createRoom}>
        Create Private Room
      </button>
    </div>
  );
}
