import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/chat";
import Login from "./components/Login";
import Register from "./components/Register";
//import VideoChat from "./components/video";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
    </div>
  );
}

export default App;
