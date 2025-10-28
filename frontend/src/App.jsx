import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  let authenticated = false  // This should be replaced with real authentication logic
  return (
    <Routes>
      <Route
        path="/"
        element={authenticated ? <Home /> : <Navigate to={'/login'} />}
      />

      <Route
        path="/login"
        element={!authenticated ? < Login /> : <Navigate to={'/'} />}
      />

      <Route
        path="/register"
        element={!authenticated ? <Register /> : <Navigate to={'/'} />} />
    </Routes>
  )
}

export default App
