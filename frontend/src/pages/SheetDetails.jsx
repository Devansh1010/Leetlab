import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, BookOpen, ListChecks, Star } from "lucide-react";
import useSheetStore from "../store/sheetStore";

const difficultyColors = {
  Easy: "text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-300",
  Medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-300",
  Hard: "text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-300",
};

const SheetDetails = () => {
  const { sheetId } = useParams();
  const { sheet, isGettingSheet, getSheetById } = useSheetStore();

  useEffect(() => {
    getSheetById(sheetId);
  }, [sheetId]);

  if (isGettingSheet) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!sheet) {
    return (
      <div className="text-center text-gray-500 mt-20">
        <p>Sheet not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 flex flex-col gap-8 justify-center h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            {sheet.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
            {sheet.description || "No description available for this sheet."}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-base-200 dark:bg-base-300 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
          <ListChecks className="w-4 h-4 text-primary" />
          {sheet.problems?.length || 0} Problems
        </div>
      </div>

      {/* Problem List */}
      <div className="grid gap-4">
        {sheet.problems?.length > 0 ? (
          sheet.problems.map((problem, index) => (
            <Link  key={problem.id || index} to={`/problem/${problem.id}`}>
              
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-base-100 dark:bg-base-300 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    {problem.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {problem.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {problem.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-base-200 dark:bg-base-100 text-gray-700 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>


                {/* Difficulty Badge */}
                < div
                  className={`mt-3 sm:mt-0 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${difficultyColors[problem.difficulty] || "bg-gray-200 text-gray-700"
                    }`}
                >
                  {problem.difficulty}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No problems added to this sheet yet.
          </div>
        )}
      </div >
    </div >
  );
};

export default SheetDetails;
