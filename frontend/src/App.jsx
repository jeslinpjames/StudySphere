import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { nanoid } from "nanoid"; // Import nanoid for generating unique IDs

import "./App.css";
import DashBoard from "./components/DashBoard";
import FlashCard from "./components/PostCards/FlashCard";
import Quiz from "./components/Quiz/Quiz";
import Notes from "./components/Notes/Notes";
import NotesList from "./components/Notes/NotesList";
import Search from "./components/Notes/Search";
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
  const [searchText, setSearchText] = useState("");
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <>
      {/* Dashboard visibility */}
      {!(location.pathname === "/login" || location.pathname === "/register") && (
        <DashBoard />
      )}
      <Search handleSearchNote={setSearchText}/>
      <Routes>
        {/* Routes */}
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/notes" element={<Notes />} />
        <Route
          path="/noteslist"
          element={<NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))} 
          handleAddNote={addNote}
          handleDeleteNote ={deleteNote} />} // Pass notes state as props
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