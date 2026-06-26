import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { useEffect } from 'react'
import { USER_ID } from './config/localStorageKeys'
import ExpensePage from './components/expense/ExpensePage'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'


function App() {

  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {

  //   console.log("user id", localStorage.getItem(USER_ID))
  //   if(localStorage.getItem(USER_ID)) navigate("/expense");
  //   else {
  //     if (location.pathname === "/" || location.pathname === "/expense") navigate("/signup");
  //   }

  // }, [])

  
  return (
    <>
      <CssBaseline enableColorScheme />
      <Navbar/>
       <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<ExpensePage />} />
      </Routes>
    </>
  )
}

export default App
