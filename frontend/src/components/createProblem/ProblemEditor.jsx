import { useState, useEffect } from 'react'
import Editor from "@monaco-editor/react";
import useProblemStore from '../../store/problemStore';
import useExecutionStore from '../../store/executionStore';
import { getLanguageId } from "../../libs/lang";
import { useParams } from "react-router-dom";


import {
    Play,
    FileText,
    MessageSquare,
    Lightbulb,
    Bookmark,
    Share2,
    Clock,
    BookOpen,
    Terminal,
    Code2,
    Users,
    ThumbsUp,
    Home,
    Loader2,
} from "lucide-react";

const ProblemEditor = () => {
    const { problem, isGettingProblem } = useProblemStore();
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [code, setCode] = useState("");

    const { executeCode, isExecuting, submission } = useExecutionStore();



    useEffect(() => {
        if (problem) {
            setCode(problem.codeSnippets?.[language.toUpperCase()] || "");
        }
    }, [problem, language]);

    const options = {
        fontSize: 15,
        fontFamily: 'monospace',
        lineHeight: 22,
        matchBrackets: 'always',
        minimap: { enabled: false },
        smoothScrolling: true,
        scrollBeyondLastLine: false,
        roundedSelection: true,
        automaticLayout: true,
    };

    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
    };

    const handleLanguageChange = (e) => {
        const selected = e.target.value;
        const langMap = { JavaScript: "javascript", Java: "java", Python: "python" };
        setLanguage(langMap[selected]);
    };

    const handleRunCode = (e) => {
        e.preventDefault();
        try {
            const language_id = getLanguageId(language);
            const stdin = problem.testcases.map((tc) => tc.input);
            const expected_outputs = problem.testcases.map((tc) => tc.output);
            const problem_id = problem.id
            executeCode(code, language_id, stdin, expected_outputs, problem_id);
        } catch (error) {
            console.log("Error executing code", error);
        }
    };

    if (isGettingProblem || !problem) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-200">
                <div className="card bg-base-100 p-8 shadow-xl">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/70">Loading problem...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="m-3 space-y-4">
            {/* --- Top Controls --- */}
            <div className="flex justify-between items-center bg-base-300 dark:bg-[#252526] px-4 py-3 rounded-lg shadow-sm border border-base-300 dark:border-[#333]">
                <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {problem.title}
                    </h2>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-base-200 dark:bg-[#1E1E1E] border border-base-300 dark:border-[#333] rounded-lg px-2 py-1">
                        <Code2 className="w-4 h-4 text-primary" />
                        <select
                            defaultValue="JavaScript"
                            onChange={handleLanguageChange}
                            className="bg-transparent text-sm focus:outline-none"
                        >
                            <option className='bg-base-300'>JavaScript</option>
                            <option className='bg-base-300'>Java</option>
                            <option className='bg-base-300'>Python</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200 dark:bg-[#1E1E1E] border border-base-300 dark:border-[#333] rounded-lg px-2 py-1">
                        <Terminal className="w-4 h-4 text-secondary" />
                        <select
                            value={theme}
                            onChange={handleThemeChange}
                            className="bg-transparent text-sm focus:outline-none"
                        >
                            <option value="vs-light" className='bg-base-300'>Light</option>
                            <option value="vs-dark" className='bg-base-300'>Dark</option>
                            <option value="hc-black" className='bg-base-300'>High Contrast</option>
                            <option value="one-dark-pro" className='bg-base-300'>One Dark Pro</option>
                            <option value="dracula" className='bg-base-300'>Dracula</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* --- Code Editor Section --- */}

            <div className="relative bg-base-200 dark:bg-[#1E1E1E] border border-base-300 dark:border-[#2D2D2D] rounded-xl overflow-hidden shadow-md">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-base-300 dark:bg-[#252526] border-b border-base-300 dark:border-[#333]">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </div>
                        <h2 className="ml-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                            Code Editor
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        {isExecuting ?
                            <Loader2  className='animate-spin'/>
                            :
                            <div>
                                <button
                                    disabled={isExecuting}
                                    type="button"
                                    onClick={handleRunCode}
                                    className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-base-300 dark:border-[#3a3a3a] bg-primary text-white hover:scale-105 transition-transform duration-200"
                                >
                                    <Play className="w-4 h-4" /> Run
                                </button>
                            </div>}

                        <button
                            type="submit"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-base-300 dark:border-[#3a3a3a] bg-secondary text-white hover:scale-105 transition-transform duration-200"
                        >
                            <FileText className="w-4 h-4" /> Submit
                        </button>
                    </div>
                </div>

                {/* Monaco Editor */}
                <div className="border-t border-base-300 dark:border-[#333]">
                    <Editor
                        theme={theme}
                        value={code}
                        height="80vh"
                        language={language}
                        onChange={(value) => setCode(value)}
                        options={options}
                    />
                </div>

                {/* Footer Info Bar */}
                <div className="px-4 py-1 text-xs text-gray-400 bg-base-300 dark:bg-[#252526] border-t border-base-300 dark:border-[#333] flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Last saved a few seconds ago
                    </span>
                    <span>{language.toUpperCase()} | {theme}</span>
                </div>
            </div>
        </div>
    );
};

export default ProblemEditor;
