import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Expense from './components/Expense'
import { useEffect } from 'react'
import { USER_ID } from './config/localStorageKeys'

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem(USER_ID)) navigate("/expense");
    else navigate("/signup");

  }, [])

  
  return (
    <>
      
       <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </>
  )
}

export default App
