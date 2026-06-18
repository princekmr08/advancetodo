import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Register from './component/register'
import Login from './component/login'
import Home from "./component/home"
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './component/protectedroutes'

function App() {

  
  // useEffect(() => {
  //   checkUser();
  // }, []);                it better to use useffect  in context provider so that we can use it in any component

  return (
    <>
      <Routes>
        <Route path="/" element={ <Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectedRoute >
            <Home/>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
