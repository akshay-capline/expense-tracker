import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { useEffect } from 'react'
import { USER_ID } from './config/localStorageKeys'
import ExpensePage from './components/expense/ExpensePage'
import { CssBaseline } from '@mui/material'
import ColorModeSelect from './components/mui/ColorModeSelect'

function App() {

  const navigate = useNavigate();
  const location = useLocation();


  // useEffect(() => {
  //   // if(localStorage.getItem(USER_ID)) navigate("/expense");
  //   // else if (location.pathname === "/") {
  //   //   navigate("/signup");
  //   // }
  //   // else navigate("/signup");

  // }, [navigate, location])

  
  return (
    <>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem", zIndex : 10 }} />
       <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<ExpensePage />} />
      </Routes>
    </>
  )
}

export default App
