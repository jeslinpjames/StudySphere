import { useState } from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'

import './App.css'
import DashBoard from './components/DashBoard'
import PostCards from './components/PostCards'
import Quiz from './components/Quiz'
import Notes from './components/Notes'
import ChatPdf from './components/ChatPdf'
import Login from './components/Login'

function App() {
  const location = useLocation();
  return (
    <>
    {/* <Login/> */}
    {/* making dashboard visibile only in signed in pages */}
    {location.pathname !== '/login' && <DashBoard />}
      <Routes>
        {/* routes according to clicked link */}
        {/* <Route path='/' element={<DashBoard/>}/> */}
        <Route path='/postcards' element={<PostCards/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/chatpdf' element={<ChatPdf/>}/>
        <Route path='/login' element={<Login />} />

      </Routes>
    </>
  )
}

export default App
