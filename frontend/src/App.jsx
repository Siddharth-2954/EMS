import React from 'react'
import {HashRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
        </Routes>
      </HashRouter>
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