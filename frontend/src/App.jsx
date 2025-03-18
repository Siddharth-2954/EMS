import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  }
  else{
    return <Navigate to={'/login'} />
  }
}

export default App