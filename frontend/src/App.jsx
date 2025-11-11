import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useStore from './store/store'
import { Loader2 } from 'lucide-react'
import Layout from './components/layout/Layout'

import Playlist from './pages/Playlist'
import Price from './pages/Price'
import Leaderboard from './pages/Leaderboard'
import SheetDetails from './pages/SheetDetails'
import CreatePlaylist from './components/playlist/CreatePlaylist'
import ProblemDetailPage from './pages/ProblemDetailPage'
import TodayChallange from './components/home/TodayChallange'




const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useStore()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log('Auth User:', authUser);

  if (isCheckingAuth && !authUser) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader2 className='size-10 animate-spin' />
    </div>
  }

  return (
    <Routes>

      {/* USER ROUTES */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={!authUser ? (<Navigate to="/login" />) : (<Home />)}
        />

        <Route path="leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="playlist" element={authUser ? <Playlist /> : <Navigate to="/login" />} />
        <Route path="pricing" element={authUser ? <Price /> : <Navigate to="/login" />} />
        <Route path="sheet/:sheetId" element={<SheetDetails />} />
        <Route path="problem/:problemId" element={<ProblemDetailPage />} />
        <Route path="today-challange" element={<TodayChallange />} />
        <Route path="create-playlist" element={authUser ? <CreatePlaylist /> : <Navigate to="/login" />} />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="login" element={!authUser ? <Login /> : <Navigate to="/" />} />
      <Route path="register" element={!authUser ? <Register /> : <Navigate to="/" />} />

    </Routes>

  );
}

export default App
