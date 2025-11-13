import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProblemStore from "../store/problemStore.js";
import useSubmissionStore from "../store/submissionStore.js";
import ProblemEditor from "../components/createProblem/ProblemEditor.jsx";
import Submission from "../components/submissions/Submission";
import useExecutionStore from "../store/executionStore.js";

const ProblemDetailPage = () => {
  const { problemId } = useParams();
  const { problem, isGettingProblem, getProblem } = useProblemStore();
  const {
    problemSubmissions,
    isGettingSubmissions,
    getProblemSubmission,
    getSubmissionCountForProblem
  } = useSubmissionStore();

  const {  submission } = useExecutionStore();

  useEffect(() => {
    getProblem(problemId);
    getProblemSubmission(problemId);
    getSubmissionCountForProblem(problemId);
  }, [problemId]);


  useEffect(() => {
    setTestCases(
      problem.testcases?.map((tc) => ({
        input: tc.input,
        output: tc.output,
      })) || []
    );
  }, [problem])


  const [testcases, setTestCases] = React.useState([
    { input: "", expectedOutput: "" },
  ]);

  return (
    <div className="min-h-screen w-full  bg-base-100 dark:bg-slate-900">
      {/* LEFT PANEL — Problem Details */}

      <div className="min-h-screen w-full flex">

        <div className="w-1/2 h-screen overflow-y-auto p-6 border-r border-base-300 dark:border-slate-700">
          <div className="tabs tabs-lifted">
            {/* DESCRIPTION TAB */}
            <input
              type="radio"
              name="problem_tabs"
              className="tab"
              aria-label="Description"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-200/40 dark:bg-slate-800/40 p-6 rounded-xl">
              <div className="prose max-w-none">
                {/* Title and Difficulty */}
                <div className="flex justify-between items-center mb-5 p-4 rounded-lg bg-base-200 dark:bg-slate-800 border border-base-300 dark:border-slate-700">
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {problem.title}
                  </h1>
                  <div
                    className={`px-3 py-1 text-sm font-medium rounded-full ${problem.difficulty === "Easy"
                      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300"
                      : problem.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300"
                        : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300"
                      }`}
                  >
                    {problem.difficulty}
                  </div>
                </div>

                {/* Description */}
                <p className="text-base mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                  {problem.description}
                </p>

                {/* Examples */}
                {problem.example && (
                  <>
                    <h3 className="text-lg font-semibold mb-3 text-primary">
                      Examples:
                    </h3>
                    {Object.entries(problem.example).map(([lang, eg], idx) => (
                      <div
                        key={lang}
                        className="bg-base-200 dark:bg-slate-800 p-4 rounded-lg mb-4 font-mono"
                      >
                        <p className="text-indigo-400 mb-2 font-semibold">
                          Input:
                        </p>
                        <pre className="bg-black/80 text-white rounded-lg px-3 py-2 mb-3 whitespace-pre-wrap">
                          {eg.input}
                        </pre>

                        <p className="text-indigo-400 mb-2 font-semibold">
                          Output:
                        </p>
                        <pre className="bg-black/80 text-white rounded-lg px-3 py-2 mb-3 whitespace-pre-wrap">
                          {eg.output}
                        </pre>

                        {eg.explanation && (
                          <>
                            <p className="text-emerald-400 mb-2 font-semibold">
                              Explanation:
                            </p>
                            <p className="text-gray-300">{eg.explanation}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* Constraints */}
                {problem.contraints && (
                  <>
                    <h3 className="text-lg font-semibold mb-3 text-primary">
                      Constraints:
                    </h3>
                    <div className="bg-base-200 dark:bg-slate-800 p-4 rounded-lg font-mono text-gray-300">
                      {problem.contraints}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* SUBMISSIONS TAB */}
            <input
              type="radio"
              name="problem_tabs"
              className="tab"
              aria-label="Submissions"
            />
            <div className="tab-content border-base-300 bg-base-200/40 dark:bg-slate-800/40 p-6 rounded-xl">
              {isGettingSubmissions ? (
                <p>Loading submissions...</p>
              ) : problemSubmissions.length === 0 ? (
                <p>No submissions found.</p>
              ) : (
                <ul>
                  {problemSubmissions.map((submission) => (
                    <li
                      key={submission.id}
                      className="mb-4 p-4 border border-base-300 rounded-lg bg-base-100 dark:bg-slate-700/50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${submission.status === "Accepted"
                            ? "bg-green-100 text-green-600"
                            : submission.status === "Wrong Answer"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                            }`}
                        >
                          {submission.status}
                        </span>
                      </div>
                      <p>Submitted on: {new Date(submission.createdAt).toLocaleString()}</p>
                      <p>Language: {submission.language}</p>
                      <p>Execution Time: {submission.timeTaken} ms</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* HINTS TAB */}
            <input
              type="radio"
              name="problem_tabs"
              className="tab"
              aria-label="Hints"
            />
            <div className="tab-content border-base-300 bg-base-200/40 dark:bg-slate-800/40 p-6 rounded-xl">
              {problem.hints ? (
                <ul className="list-disc list-inside text-gray-300">
                  {problem.hints}
                </ul>
              ) : (
                <p>No hints available for this problem.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Editor */}
        <div className="w-1/2 h-screen overflow-hidden flex flex-col">
          <div className="h-full p-4">
            <div className="h-full rounded-2xl overflow-hidden border border-base-300 dark:border-slate-700 shadow-md">
              <ProblemEditor />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          {submission ? (
            <Submission submission={submission} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Test Cases</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Expected Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testcases.map((testCase, index) => (
                      <tr key={index}>
                        <td className="font-mono">{testCase.input}</td>
                        <td className="font-mono">{testCase.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProblemDetailPage;
