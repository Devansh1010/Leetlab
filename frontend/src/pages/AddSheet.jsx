import React, { useEffect, useState } from "react";
import useProblemStore from "../store/problemStore";
import { Loader2, Plus } from "lucide-react";

const AddSheet = () => {
  // Selectors (each separately for proper reactivity)
  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isGettingProblems = useProblemStore((state) => state.isGettingProblems);
  const problems = useProblemStore((state) => state.problems);

  const [error, setError] = useState("");

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

  //  Check for data and render cleanly
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Problems</h2>

      {problems.length > 0 ? (
        <ul className="bg-base-100 rounded-box shadow-md divide-y divide-gray-200">
          {problems.map((problem, index) => (
            <li key={problem.id || index} className="flex items-center justify-between p-4">
              {/* Problem index */}
              <div className="text-lg font-medium text-gray-400">{index + 1}.</div>

              {/* Problem image (optional placeholder) */}
              <img
                className="w-10 h-10 rounded-md object-cover mx-3"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                alt="problem"
              />

              {/* Problem title and tags */}
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{problem.title}</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {/* ✅ Moved inside a flex row — cleaner rendering */}
                  {problem.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="badge badge-outline badge-info text-xs uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <button
                className="btn btn-square btn-ghost hover:bg-primary hover:text-white"
                title="Add Problem"
              >
                <Plus />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-6">No problems found.</p>
      )}
    </div>
  );
};

export default AddSheet;
