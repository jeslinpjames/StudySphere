import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import DashBoard from "./components/DashBoard";
import FlashCard from "./components/PostCards/FlashCard";
import Quiz from "./components/Quiz/Quiz";
import Notes from "./components/Notes/Notes";
import ChatPdf from "./components/ChatPdf";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import FlashCardList from "./components/PostCards/FlashCardList";
import Questions from "./components/Quiz/Questions";

function App() {
  const location = useLocation();
  return (
    <>
      {/* <Login/> */}
      {/* making dashboard visibile only in signed in pages */}
      {!(
        location.pathname === "/login" || location.pathname === "/register"
      ) && <DashBoard />}
      <Routes>
        {/* routes according to clicked link */}
        {/* <Route path='/' element={<DashBoard/>}/> */}
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/chatpdf" element={<ChatPdf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards/:subject" element={<FlashCardList />} />
        <Route path="/quiz/:subject" element={<Questions />} />
      </Routes>
    </>
  );
}

export default App;
