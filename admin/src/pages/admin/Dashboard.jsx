import React, { useEffect } from 'react'
import useStore from '../../store/store'
import useProblemStore from '../../store/problemStore'
import useSheetStore from '../../store/sheetStore'

const Dashboard = () => {
  const { getUserCount, gettingCount, userCount } = useStore()
  const { getProblemCount, isGettinProblemCount, problemCount } = useProblemStore()
  const { getSheetsCount, isGeetingSheetCount, sheetsCount } = useSheetStore()

  useEffect(() => {
    getUserCount()
    getProblemCount()
    getSheetsCount()
  }, [])
  return (
    <section className="w-full px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Users */}
        <div className="bg-base-100 dark:bg-base-300 border border-base-300 rounded-xl p-3 flex flex-col gap-1">
          <span className="text-xs text-base-content/60">Users</span>
          {!gettingCount ? (
            <span className="text-lg font-semibold">{userCount}</span>
          ) : (
            <div className="skeleton h-4 w-16"></div>
          )}
        </div>

        {/* Problems */}
        <div className="bg-base-100 dark:bg-base-300 border border-base-300 rounded-xl p-3 flex flex-col gap-1">
          <span className="text-xs text-base-content/60">Problems</span>
          {!isGettinProblemCount ? (
            <span className="text-lg font-semibold">{problemCount}</span>
          ) : (
            <div className="skeleton h-4 w-16"></div>
          )}
        </div>

        {/* Sheets */}
        <div className="bg-base-100 dark:bg-base-300 border border-base-300 rounded-xl p-3 flex flex-col gap-1">
          <span className="text-xs text-base-content/60">Sheets</span>
          {!isGeetingSheetCount ? (
            <span className="text-lg font-semibold">{sheetsCount}</span>
          ) : (
            <div className="skeleton h-4 w-16"></div>
          )}
        </div>

      </div>

      <div className="divider mt-6"></div>
    </section>


  )
}

export default Dashboard