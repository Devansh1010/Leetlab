import { useEffect } from "react";
import useStore from "../store/store";

const Leaderboard = () => {
  const { allUserdata, isGettingAllUserData, getAllUsers } = useStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (isGettingAllUserData)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="font-bold text-2xl text-[#0f172a] dark:text-gray-200">
          Loading...
        </h1>
      </div>
    );

  // If no users
  if (!allUserdata || allUserdata.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold text-gray-600 dark:text-gray-400">
        No users found.
      </div>
    );

  // SORT USERS (DESCENDING → Highest first)
  const sortedUsers = [...allUserdata].sort((a, b) => {
    if (b.longestStreak !== a.longestStreak)
      return b.longestStreak - a.longestStreak; // highest longest first

    return b.streakCount - a.streakCount; // if tie → highest current first
  });

  // Rank Badge Component
  const RankBadge = ({ rank }) => {
    const rankStyles = [
      "bg-yellow-400 text-[#0f172a]", // Gold
      "bg-gray-300 text-[#0f172a]",  // Silver
      "bg-orange-400 text-white",    // Bronze
    ];

    return (
      <div
        className={`w-10 h-10 flex justify-center items-center rounded-full font-bold shadow-sm border border-primary ${
          rank < 3 ? rankStyles[rank] : "bg-primary/20 text-primary"
        }`}
      >
        {rank + 1}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#161616] text-[#0f172a] dark:text-gray-200 py-16">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-10 text-[#0f172a] dark:text-gray-100">
          Leaderboard
        </h1>

        <div className="space-y-4">
          {sortedUsers.map((user, idx) => (
            <div
              key={idx}
              className="
                flex items-center justify-between gap-4
                p-4 rounded-xl border border-primary bg-white dark:bg-[#111111]
                shadow-md hover:shadow-lg transition-all duration-300
              "
            >
              {/* Rank Badge */}
              <RankBadge rank={idx} />

              {/* User Avatar */}
              <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden border border-primary">
                {user.image}
              </div>

              {/* Name */}
              <div className="flex-1 ml-4 font-semibold text-lg truncate">
                {user.name}
              </div>

              {/* Streak Info */}
              <div className="flex gap-6 text-sm text-center">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-primary">
                    {user.streakCount}
                  </span>
                  <span className="text-xs opacity-70">Current</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-bold text-primary">
                    {user.longestStreak}
                  </span>
                  <span className="text-xs opacity-70 whitespace-nowrap">
                    Longest
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
