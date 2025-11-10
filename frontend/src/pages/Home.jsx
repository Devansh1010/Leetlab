

import { use, useEffect, useState } from "react";
import useProblemStore from "../store/problemStore";
import { Loader2 } from "lucide-react";
import useStore from '../store/store.js'
import { Code2, Layers, Terminal, Trophy } from "lucide-react";
import useSheetStore from "../store/sheetStore.js";
import SheetCard from "../components/sheet/SheetCard.jsx";
import { Link } from "react-router-dom";


const Home = () => {
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isGettingProblems = useProblemStore((state) => state.isGettingProblems);
  const problems = useProblemStore((state) => state.problems);

  const { sheets, isGettingSheet, getSheets } = useSheetStore()

  const [error, setError] = useState("");

  const [quote, setQuote] = useState("Every line of code you write is a vote for the programmer you’re becoming.")

  const { authUser, updateStreak } = useStore()

  useEffect(() => {
    updateStreak()
  }, [])

  useEffect(() => {
    getSheets()
  }, [])

  //  Fetch all problems 
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        await getAllProblems();
      } catch (error) {
        setError(`Error Getting Problems: ${error}`);
      }
    };

    fetchProblems();
  }, [getAllProblems]);

  //  Loader while fetching
  if (isGettingProblems)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );

  //  Error handling
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;



  return (
    <div>
      <section className="relative  min-h-screen flex items-center justify-center overflow-hidden">
        <div className="pt-20 px-6 pb-10 min-h-screen">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Study Collections</h2>
          </div>

          {/* Sheets Grid */}
          {sheets && sheets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sheets.map((s, index) => (
                <Link key={s.id || index} to={`/sheet/${s.id}`}>
                  <SheetCard
                    title={s.title}
                    description={s.description}
                    id={s.id}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 text-gray-500 dark:text-gray-400 mt-20">
              <h3 className="text-lg font-medium">No Sheets Available</h3>
            </div>
          )}
        </div>


      </section>

      {/* Problems Section */}
      <section className="min-h-screen px-6 py-20 bg-transparent text-gray-800 dark:text-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🧩 All Problems
            </h2>
            <span className="rounded-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 text-sm font-semibold shadow-md">
              {problems.length} Total
            </span>
          </div>

          {/* Problems Table */}
          {problems.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-lg transition-all duration-300">
              <table className="w-full border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-secondary text-white text-left">
                    <th className="p-4 w-12"></th>
                    <th className="p-4 w-16">#</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Tags</th>
                    <th className="p-4 text-right w-24">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={problem.id || index}
                      className={`transition-colors duration-200 ${index % 2 === 0
                          ? "bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100/70 dark:hover:bg-gray-700/60"
                          : "bg-gray-100/60 dark:bg-gray-800/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
                        }`}
                    >
                      {/* ✅ Solved Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-primary"
                          checked={problem.isSolved}
                          readOnly
                        />
                      </td>

                      {/* Index */}
                      <td className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                        {index + 1}
                      </td>

                      {/* Title */}
                      <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                        {problem.title}
                      </td>

                      {/* Description */}
                      <td className="p-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {problem.description || "No description available."}
                      </td>

                      {/* Tags */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {problem.tags?.map((tag, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-primary/30 text-primary dark:text-secondary text-xs font-medium px-2 py-0.5 bg-primary/5 dark:bg-secondary/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Solve Button */}
                      <td className="p-4 text-right">
                        <button className="btn btn-xs rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-transform duration-200 shadow-md">
                          Solve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No problems found.</p>
            </div>
          )}
        </div>
      </section>


    </div>
  )
}

export default Home