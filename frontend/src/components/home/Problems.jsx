import React, { useEffect } from 'react'
import useProblemStore from '../../store/problemStore';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Problems = () => {
    const getAllProblems = useProblemStore((state) => state.getAllProblems);
    const isGettingProblems = useProblemStore((state) => state.isGettingProblems);
    const problems = useProblemStore((state) => state.problems);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                await getAllProblems();
            } catch (error) {
                console.error("Error Getting Problems:", error);
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

    return (
        <section className="min-h-screen bg-white dark:bg-[#161616] py-16 transition-colors">
            <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-extrabold text-[#0f172a] dark:text-gray-100">
                        All Problems
                    </h2>

                    <span
                        className="
                        rounded-full border border-primary 
                        text-[#0f172a] dark:text-gray-200 
                        bg-white dark:bg-[#111111]
                        px-4 py-1.5 text-sm font-semibold shadow-sm
                        "
                    >
                        {problems.length} Total
                    </span>
                </div>

                {/* TABLE */}
                {problems.length > 0 ? (
                    <div className="
                        overflow-x-auto rounded-xl
                        border border-primary
                        bg-white dark:bg-[#111111]
                        shadow-lg transition-colors
                    ">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-primary/10 dark:bg-primary/20 text-[#0f172a] dark:text-gray-200 text-left">
                                    <th className="p-4 w-12"></th>
                                    <th className="p-4 w-16">#</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Tags</th>
                                </tr>
                            </thead>

                            <tbody>
                                {problems.map((problem, index) => (
                                    <tr
                                        key={problem.id || index}
                                        className="
                                            hover:bg-primary/10 dark:hover:bg-primary/20
                                            transition-colors cursor-pointer
                                        "
                                        onClick={() => navigate(`/problem/${problem.id}`)}
                                    >
                                        <td className="p-4 text-center">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm checkbox-primary"
                                                checked={problem.isSolved}
                                                readOnly
                                            />
                                        </td>

                                        <td className="p-4 font-semibold text-[#0f172a] dark:text-gray-200">
                                            {index + 1}
                                        </td>

                                        <td className="p-4 font-medium text-[#0f172a] dark:text-gray-100">
                                            {problem.title}
                                        </td>

                                        <td className="p-4 text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                                            {problem.description || "No description available."}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {problem.tags?.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="
                                                        rounded-full border border-primary 
                                                        bg-white dark:bg-[#1f1f1f]
                                                        text-[#0f172a] dark:text-gray-200
                                                        text-xs font-medium px-2 py-1 shadow-sm
                                                        "
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                        <p className="text-lg">No problems found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Problems;
