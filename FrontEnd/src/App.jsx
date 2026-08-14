import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'

import WelcomePage from './Pages/WelcomePage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import InfoPage from './Pages/InfoPage'

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<WelcomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/info" element={<InfoPage />} />

      </Routes>
    </>
  )
}

export default App