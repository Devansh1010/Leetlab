import React, { useEffect } from 'react'
import useStore from '../../store/store';
import useProblemStore from '../../store/problemStore';
import { motion } from "framer-motion";
import { Code, Flame, ChevronRight } from "lucide-react";

const difficultyColors = {
    EASY: "text-green-600 bg-green-100",
    MEDIUM: "text-yellow-600 bg-yellow-100",
    HARD: "text-red-600 bg-red-100",
};

const TodayChallange = () => {
    const { authUser } = useStore()
    const { getAllProblems, problems } = useProblemStore();
    const [todayChallange, setTodayChallange] = React.useState(null);

    useEffect(() => {
        if (!authUser?.lastLoginDate) return;

        const today = new Date();
        const todayLocalDate = today.toLocaleDateString("en-CA");

       
        const storedData = localStorage.getItem("todayChallenge");
        let storedChallenge = null;

        if (storedData) {
            try {
                storedChallenge = JSON.parse(storedData);
                const isValid =
                    storedChallenge &&
                    storedChallenge.date === todayLocalDate &&
                    storedChallenge.problem &&
                    storedChallenge.problem.id;

                if (!isValid) {
                    
                    localStorage.removeItem("todayChallenge");
                    storedChallenge = null;
                }
            } catch (e) {
                console.warn("Invalid JSON in localStorage, clearing...");
                localStorage.removeItem("todayChallenge");
            }
        }

        //  If valid stored challenge exists, use it
        if (storedChallenge) {
            console.log("🟢 Loaded Today Challenge from localStorage");
            setTodayChallange(storedChallenge.problem);
            return;
        }

        // Else fetch new challenge from backend
        const fetchChallenge = async () => {
            await getAllProblems();

            // If problems not yet fetched or empty
            if (!problems || problems.length === 0) return;

            // Filter unsolved problems
            const notSolvedProblems = problems.filter(
                (problem) => !authUser.problemsSolved.includes(problem.id)
            );

            if (notSolvedProblems.length === 0) return;

            // Pick a random problem
            const randomIndex = Math.floor(Math.random() * notSolvedProblems.length);
            const problemOfTheDay = notSolvedProblems[randomIndex];
            setTodayChallange(problemOfTheDay);

            // Save new challenge to localStorage
            localStorage.setItem(
                "todayChallenge",
                JSON.stringify({ date: todayLocalDate, problem: problemOfTheDay })
            );
        };

        fetchChallenge();
    }, [authUser]);


    if (!todayChallange) return <p className="text-center mt-6">No challenge available</p>;

    return (
        <div className='p-1 mb-2'>
            <motion.div
                className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        🧩 {todayChallange.title}
                    </h2>
                    <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${difficultyColors[todayChallange.difficulty]}`}
                    >
                        {todayChallange.difficulty}
                    </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {todayChallange.description.length > 180
                        ? todayChallange.description.slice(0, 180) + "..."
                        : todayChallange.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                    {todayChallange.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-5 overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                            <Code size={16} /> JavaScript Snippet
                        </span>
                    </div>
                    <pre className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                        {todayChallange.codeSnippets?.JAVASCRIPT?.slice(0, 180)}...
                    </pre>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        <Flame className="inline mr-1 text-orange-500" size={16} />
                        {todayChallange.contraints}
                    </div>
                    <button
                        className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
                        onClick={() => console.log("Navigate to /problem/" + todayChallange.id)}
                    >
                        Solve Now <ChevronRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default TodayChallange;
