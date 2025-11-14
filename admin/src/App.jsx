import './App.css'

import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminAuthentication from './components/AdminAuthentication'
import AddProblem from './pages/admin/AddProblem'
import Login from './pages/auth/Login'
import useStore from './store/store'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import Dashboard from './pages/admin/Dashboard'

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log("User in App: ", authUser)

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <>
      <Routes>

        <Route
          element={<AdminAuthentication />}   // admin-only routes
        >
          <Route
            path="/"
            element={<Layout />}
          >
            <Route index element={<Dashboard />} />
            <Route path="add-problem" element={<AddProblem />} />
          </Route>
        </Route>

        {/* Login */}
        <Route
          path="/login"
          element={
            authUser && authUser.role === 'ADMIN'
              ? <Navigate to="/" />
              : <Login />
          }
        />

      </Routes>
    </>
  )
}

export default App
