import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./components/NotFound";

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const location = useLocation();
  const accessToken = localStorage.getItem("access");
  // const refreshToken = localStorage.getItem("refreshToken");

  // Check if both tokens exist and are not empty strings
  const isAuthenticated = accessToken;

  return (
    <>
      {/* Dashboard visibility */}
      {isAuthenticated &&
        !(
          location.pathname === "/login" || location.pathname === "/register"
        ) && <DashBoard />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={<ProtectedRoutes>{/* <DashBoard /> */}</ProtectedRoutes>}
        />
        <Route
          path="/home"
          element={<ProtectedRoutes>{/* <DashBoard /> */}</ProtectedRoutes>}
        />
        <Route
          path="/flashcards"
          element={
            <ProtectedRoutes>
              <FlashCard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoutes>
              <Quiz />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoutes>
              <Notes />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/notes/:subject"
          element={
            <ProtectedRoutes>
              <NotesList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/chatpdf"
          element={
            <ProtectedRoutes>
              <ChatPdf />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/flashcards/:subject"
          element={
            <ProtectedRoutes>
              <FlashCardList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quiz/:subject"
          element={
            <ProtectedRoutes>
              <QuestionsList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quiz/:subject/:qn_id"
          element={
            <ProtectedRoutes>
              <Question />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
