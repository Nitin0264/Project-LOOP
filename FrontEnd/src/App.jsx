import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage'
import InfoPage from './Pages/InfoPage'
import LoginPage from './Pages/LoginPage'
import Navbar from './Componenets/Navbar'
import RegisterPage from './Pages/RegisterPage'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path = '/' element = {<WelcomePage />}/>
      <Route path = '/info' element = {<InfoPage />} />
      <Route path = '/login' element = {<LoginPage />} />
      <Route path='/register' element = {<RegisterPage />} />
    </Routes>
    </>
  )
}

export default App