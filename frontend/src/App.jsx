import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { nanoid } from "nanoid"; // Import nanoid for generating unique IDs

import "./App.css";
import DashBoard from "./components/DashBoard";
import FlashCard from "./components/PostCards/FlashCard";
import Quiz from "./components/Quiz/Quiz";
import Notes from "./components/Notes/Notes";
import NotesList from "./components/Notes/NotesList";
import ChatPdf from "./components/ChatPdf";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import FlashCardList from "./components/PostCards/FlashCardList";
import Questions from "./components/Quiz/Questions";

function App() {
  const location = useLocation();

  // Initialize notes state with example notes
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "12/12/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "15/12/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "22/12/2021",
    },
  ]);

  return (
    <>
      {/* Dashboard visibility */}
      {!(location.pathname === "/login" || location.pathname === "/register") && (
        <DashBoard />
      )}

      <Routes>
        {/* Routes */}
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/notes" element={<Notes />} />
        {/* Pass notes state to NotesList component */}
        <Route
          path="/noteslist"
          element={<NotesList notes={notes} />} // Pass notes state as props
        />
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
