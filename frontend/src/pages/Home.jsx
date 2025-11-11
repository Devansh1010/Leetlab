import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import useProblemStore from "../store/problemStore";

import useStore from "../store/store";
import Sheets from "../components/home/Sheets.jsx";



const Home = () => {
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isGettingProblems = useProblemStore((state) => state.isGettingProblems);
  const problems = useProblemStore((state) => state.problems);


  
  const { updateStreak } = useStore();
  const [error, setError] = useState("");


  useEffect(() => {
    updateStreak();

  }, []);

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

  if (isGettingProblems)
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="bg-linear-to-b from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-all duration-500">

      <Sheets />
   
  

      {/* ----------------------------- */}
      {/* PROBLEMS SECTION */}
      {/* ----------------------------- */}
      <section className="relative py-20 bg-white/80 dark:bg-slate-800/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              ⚡ All Problems
            </h2>
            <span className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-4 py-1.5 text-sm font-semibold shadow-md">
              {problems.length} Total
            </span>
          </div>

          {problems.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-xl transition-all duration-300">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-left">
                    <th className="p-4 w-12"></th>
                    <th className="p-4 w-16">#</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Tags</th>
                    <th className="p-4 text-right w-24">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={problem.id || index}
                      className={`transition-colors duration-200 ${index % 2 === 0
                          ? "bg-gray-50/60 dark:bg-gray-800/40 hover:bg-gray-100/70 dark:hover:bg-gray-700/60"
                          : "bg-gray-100/60 dark:bg-gray-800/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
                        }`}
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm checkbox-primary"
                          checked={problem.isSolved}
                          readOnly
                        />
                      </td>
                      <td className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                        {problem.title}
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {problem.description || "No description available."}
                      </td>
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
                      <td className="p-4 text-right">
                        <button className="btn btn-xs rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:scale-105 transition-transform duration-200 shadow-md">
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

      {/* ----------------------------- */}
      {/* FOOTER CTA */}
      {/* ----------------------------- */}
      <footer className="text-center py-10 text-gray-600 dark:text-gray-400">
        <p>
          Built for dreamers who code — keep pushing, keep building. 🚀
        </p>
      </footer>
    </div>
  );
};

export default Home;
