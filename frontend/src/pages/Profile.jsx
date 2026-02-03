import React, { useEffect } from 'react'
import useStore from '../store/store'

const Profile = () => {
    const { authUser, isCheckingAuth, checkAuth } = useStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])


    if (isCheckingAuth) return <div className='min-h-screen flex justify-center items-center text-2xl'>Loading...</div>

    console.log(authUser)
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            {authUser ? (
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                        <img
                            src={authUser.image || "/default-avatar.png"}
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                        />
                        <div>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {authUser.name || "Guest User"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {authUser.email || "No email available"}
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {authUser.longestStreak || 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Streak Count</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {authUser.streakCount || 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {Array.isArray(authUser.problemsSolved) ? authUser.problemsSolved.length : 0}
                            </p>
                        </div>
                    </div>

                    {/* Activity Feed Placeholder */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Recent Activity
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Coming soon...
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">No user data available</p>
                </div>
            )}
        </div>
    )
}

export default Profile