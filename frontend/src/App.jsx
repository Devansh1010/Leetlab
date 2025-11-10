import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useStore from './store/store'
import { Loader2 } from 'lucide-react'
import Layout from './components/layout/Layout'
import AddProblem from './pages/AddProblem'
import AddSheet from './pages/AddSheet'
import AdminRoute from './components/layout/AdminRoute'
import Admin from './pages/Admin'
import Playlist from './pages/Playlist'
import Price from './pages/Price'
import Leaderboard from './pages/Leaderboard'
import AdminLayout from './components/layout/AdminLayout'
import SheetDetails from './pages/SheetDetails'


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

      {/* ADMIN ROUTES */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="add-problem" element={<AddProblem />} />
          <Route path="add-sheet" element={<AddSheet />} />
        </Route>
      </Route>

      {/* USER ROUTES */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            !authUser ? (
              <Navigate to="/login" />
            ) : authUser.role === "ADMIN" ? (
              <Navigate to="/admin" />
            ) : (
              <Home />
            )
          }
        />

        <Route path="leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="playlist" element={authUser ? <Playlist /> : <Navigate to="/login" />} />
        <Route path="pricing" element={authUser ? <Price /> : <Navigate to="/login" />} />
        <Route path="sheet/:id" element={<SheetDetails />} /> 
      </Route>

      {/* AUTH ROUTES */}
      <Route path="login" element={!authUser ? <Login /> : <Navigate to="/" />} />
      <Route path="register" element={!authUser ? <Register /> : <Navigate to="/" />} />

    </Routes>

  );
}

export default App
