# 💬 Talk Now – Private Chat Rooms  

[![Made with React](https://img.shields.io/badge/Made%20with-React-blue?logo=react)](https://reactjs.org/)  
[![Socket.IO](https://img.shields.io/badge/Powered%20by-Socket.IO-black?logo=socket.io)](https://socket.io/)  
[![Express](https://img.shields.io/badge/Backend-Express.js-green?logo=express)](https://expressjs.com/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

🚀 **Talk Now** is a real-time private chat application built with **React.js (frontend)** and **Node.js + Express + Socket.IO (backend)**.  
It allows users to create instant chat rooms without registration — purely peer-to-peer communication powered by **WebSockets**.  

---

## ✨ Features
- ⚡ **Instant Setup** – Create & join rooms in seconds  
- 👤 **No Registration** – Just enter a name and start chatting  
- 🔒 **Truly Private** – Messages disappear after leaving, no database, no tracking  
- 📱 **Responsive Design** – Works on desktop & mobile  
- 🔗 **Sharable Room Links** – Invite others by sharing a unique link  

---

## 🛠️ Tech Stack  

**Frontend:**  
- ⚛️ React.js  
- 🎨 CSS (custom styling)  
- 📦 React Router (for room navigation)  
- 🎭 React Icons (for UI icons)  

**Backend:**  
- 🌐 Node.js  
- 🚀 Express.js  
- 🔌 Socket.IO (real-time communication)  
- 🔒 CORS  

**Deployment:**  
- 🌍 Render / AWS (backend)  
- ▲ Vercel (frontend)  

---

## 📸 Screenshots  

**Home Page**  
![Home Screenshot](./home.png)  

**Chat Room**  
![Chat Screenshot](./chatroom.png)  

---

## ⚡ Getting Started  

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/talk-now.git
cd talk-now


2. Setup Backend
cd backend
npm install
npm run dev


Runs on http://localhost:5000

Handles all WebSocket connections for real-time messaging

Emits messages for join, leave, and chat events

No database used; all messages vanish on refresh or exit

### 3. Setup Frontend
cd frontend
npm install
npm start


Runs on http://localhost:3000

Users can create or join rooms using a unique link

Messages appear live using Socket.IO

On refresh, the chat for that user clears but room stays active

# 🤝 Contributing

We welcome contributions! 🎉

Steps to Contribute

Fork this repository

Create a branch:

git checkout -b feature/your-feature


Make your changes (frontend or backend)

Commit & push your branch

Open a Pull Request 🚀

Good First Issues

Add database persistence (MongoDB / PostgreSQL)

Implement user authentication (JWT / OAuth)

Display online users per room

Add typing indicators

Enhance UI/UX (animations, responsive improvements)

📜 License

This project is licensed under the MIT License – free to use, modify, and contribute.

🔗 Live Demo

Frontend: https://your-frontend-link.com

Backend API: https://your-backend-link.com

💡 Notes

This app runs purely on WebSockets; no messages are persisted on server or database

Refreshing the page clears the chat only for that user

Rooms remain live until all users leave
