import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatRoom from "./ChatRoom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}
