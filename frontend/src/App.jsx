import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import DashBoard from "./components/DashBoard";
import FlashCard from "./components/PostCards/FlashCard";
import Quiz from "./components/Quiz/Quiz";
import Notes from "./components/Notes/Notes";
import NotesList from "./components/Notes/NotesList";
import ChatPdf from "./components/ChatPDF/ChatPdf";
import Profile from "./components/Profile";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import FlashCardList from "./components/PostCards/FlashCardList";
import QuestionsList from "./components/Quiz/QuestionsList";
import Question from "./components/Quiz/Question";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Dashboard visibility */}
      {!(
        location.pathname === "/login" || location.pathname === "/register"
      ) && <DashBoard />}
      <Routes>
        {/* Routes */}
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:subject" element={<NotesList />} />
        <Route path="/chatpdf" element={<ChatPdf />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards/:subject" element={<FlashCardList />} />
        <Route path="/quiz/:subject" element={<QuestionsList />} />
        <Route path="/quiz/:subject/:qn_id" element={<Question />} />
      </Routes>
    </>
  );
}

export default App;
