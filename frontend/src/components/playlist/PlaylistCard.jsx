import React from "react";
import { ListChecks, ArrowRight } from "lucide-react";

const PlaylistCard = ({ title, description, problemCount, difficulty }) => {
  // Optional difficulty color logic
  const difficultyColor =
    difficulty === "Easy"
      ? "bg-green-500"
      : difficulty === "Medium"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <span
          className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${difficultyColor}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
        {description}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
          <ListChecks size={16} />
          <span>{problemCount} Problems</span>
        </div>

        <button className="flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all duration-300">
          View <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
