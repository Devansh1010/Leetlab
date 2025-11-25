import { useEffect, useState } from 'react'
import useStore from '../store/store'


const Leaderboard = () => {

  const { allUserdata, isGettingAllUserData, getAllUsers } = useStore()
  useEffect(() => {
    getAllUsers()
  }, [])

  if (isGettingAllUserData) return <div className='min-h-screen flex'><h1 className='justify-center items-center font-bold text-2xl'>Loading...</h1></div>

  return (
   <div className="flex min-h-screen flex-col overflow-y-auto bg-base-100 text-base-content">
  {!allUserdata ? (
    <div className="flex items-center justify-center h-full text-lg font-semibold">
      No user found
    </div>
  ) : (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      {allUserdata.map((user, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 rounded-lg shadow-md bg-base-200 hover:bg-base-300 transition-colors"
        >
          {/* User Image */}
          <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden border border-base-300">
            {user.image}
          </div>

          {/* User Name */}
          <div className="flex-1 ml-4 font-medium text-lg">
            {user.name}
          </div>

          {/* Streak Info */}
          <div className="flex gap-6 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-semibold">{user.streakCount}</span>
              <span className="text-xs opacity-70">Current Streak</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">{user.longestStreak}</span>
              <span className="text-xs opacity-70">Longest Streak</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )
}

export default Leaderboard