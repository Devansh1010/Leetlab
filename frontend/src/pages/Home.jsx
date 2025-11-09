

import { use, useEffect, useState } from "react";
import useProblemStore from "../store/problemStore";
import { Loader2 } from "lucide-react";
import useStore from '../store/store.js'
import { Code2, Layers, Terminal, Trophy } from "lucide-react";


const Home = () => {
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isGettingProblems = useProblemStore((state) => state.isGettingProblems);
  const problems = useProblemStore((state) => state.problems);

  const [error, setError] = useState("");

  const [quote, setQuote] = useState("Every line of code you write is a vote for the programmer you’re becoming.")

  const { authUser, updateStreak } = useStore()

  useEffect(() => {
    updateStreak()
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
      <section className="relative bg-linear-to-b from-base-100 via-base-200 to-base-300 min-h-screen flex items-center justify-center overflow-hidden">

        {/* Decorative background icons */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-16 left-24">
            <Code2 className="w-28 h-28 text-primary" />
          </div>
          <div className="absolute bottom-20 right-28">
            <Layers className="w-24 h-24 text-secondary" />
          </div>
          <div className="absolute top-32 right-1/3">
            <Terminal className="w-20 h-20 text-accent" />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative hero-content text-center z-10">
          <div className="max-w-xl space-y-6">
            {/* Heading */}
            <h1 className="text-5xl font-extrabold text-secondary">
              Welcome back,{" "}
              <span className="text-primary">{authUser?.name || "Coder"}</span> 👋
            </h1>

            {/* Subtitle / quote */}
            <p className="text-lg text-gray-600 leading-relaxed italic">
              “{quote || "Sharpen your logic. Elevate your coding journey."}”
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button className="btn btn-primary flex items-center gap-2">
                <Code2 className="w-5 h-5" /> Start Solving
              </button>

              <button className="btn btn-outline btn-secondary flex items-center gap-2">
                <Trophy className="w-5 h-5" /> Leaderboard
              </button>
            </div>
          </div>
        </div>

        {/* Light overlay gradient for focus */}
        <div className="absolute inset-0 bg-linear-to-t from-base-300/40 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Problems Section */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            🧩 All Problems
          </h2>
          <span className="badge badge-primary text-white px-3 py-2 text-sm">
            {problems.length} Total
          </span>
        </div>

        {problems.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl shadow-sm">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-primary text-white text-left">
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
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-gray-100 hover:bg-gray-200"
                      }`}
                  >
                    {/* ✅ Solved Checkbox */}
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={problem.isSolved}
                        readOnly
                      />
                    </td>

                    {/* Index */}
                    <td className="p-4 font-semibold text-gray-600">{index + 1}</td>

                    {/* Title */}
                    <td className="p-4 font-medium text-gray-800">{problem.title}</td>

                    {/* Description */}
                    <td className="p-4 text-gray-600 text-sm line-clamp-2">
                      {problem.description || "No description available."}
                    </td>

                    {/* Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="badge badge-outline badge-info text-xs uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Solve Button */}
                    <td className="p-4 text-right">
                      <button className="btn btn-xs btn-outline btn-primary rounded-full text-xs">
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


    </div>
  )
}

export default Home