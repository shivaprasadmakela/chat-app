import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatRoom from "./ChatRoom";
import JoinChat from "./JoinChat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<JoinChat />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}
