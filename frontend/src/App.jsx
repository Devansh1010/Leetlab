import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useStore from './store/store'
import { Loader2 } from 'lucide-react'
import Layout from './components/layout/Layout'
import AddProblem from './pages/AddProblem'
import AdminRoute from './components/layout/AdminRoute'
import Admin from './pages/Admin'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useStore()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader2 className='size-10 animate-spin' />
    </div>
  }

  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route
          path='admin'
          element={<Admin />}
        />

        <Route
          path="add-problem"
          element={authUser ? <AddProblem /> : <Navigate to="/login" />}
        />

      </Route>

      <Route path="/" element={<Layout />}>

        <Route
          index
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="home"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />



      </Route>

      <Route
        path="login"
        element={!authUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="register"
        element={!authUser ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App
