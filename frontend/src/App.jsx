import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'

import './App.css'
import DashBoard from './components/DashBoard'
import PostCards from './components/PostCards'
import Quiz from './components/Quiz'
import Notes from './components/Notes'
import ChatPdf from './components/ChatPdf'


function App() {

  return (
    <>
      <DashBoard/>
      <Routes>
        {/* routes according to clicked link */}
        <Route path='/' element={''}/>
        <Route path='/postcards' element={<PostCards/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/chatpdf' element={<ChatPdf/>}/>

      </Routes>
    </>
  )
}

export default App
