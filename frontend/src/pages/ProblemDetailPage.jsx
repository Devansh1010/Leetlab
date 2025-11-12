import React, { use, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import useProblemStore from '../store/problemStore.js';
import useSubmissionStore from '../store/submissionStore.js';

const ProblemDetailPage = () => {

  const { problemId } = useParams()
  const { problem, isGettingProblem, getProblem } = useProblemStore()
  const { problemSubmissions, isGettingSubmissions, getProblemSubmission } = useSubmissionStore()

  useEffect(() => {
    getProblem(problemId)
    getProblemSubmission(problemId)
  }, [problemId])



  return (
    <div className='min-h-screen w-full p-6'>
      <div className='w-full flex '>
        <div className='w-1/2'>
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-border min-h-10">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="Description" defaultChecked />
            <div className="tab-content border-base-300 bg-base-100 p-10 min-h-screen">
              <div className='h-full '>
                <div className="prose max-w-none">
                  <div className="flex justify-between items-center mb-5 p-4 rounded-lg bg-base-200 dark:bg-slate-800 border border-base-300 dark:border-slate-700">
                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {problem.title}
                    </h1>

                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full
                        ${problem.difficulty === "Easy"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300"
                            : problem.difficulty === "Hard"
                              ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300"
                        }`}
                    >
                      {problem.difficulty}
                    </div>
                  </div>

                  <p className="text-lg mb-6">{problem.description}</p>

                  {problem.example && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Examples:</h3>
                      {Object.entries(problem.example).map(
                        ([lang, eg], idx) => (
                          <div
                            key={lang}
                            className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                          >
                            <div className="mb-4">
                              <div className="text-indigo-300 mb-2 text-base font-semibold">
                                Input:
                              </div>
                              <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                                {eg.input}
                              </span>
                            </div>
                            <div className="mb-4">
                              <div className="text-indigo-300 mb-2 text-base font-semibold">
                                Output:
                              </div>
                              <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                                {eg.output}
                              </span>
                            </div>
                            {eg.explanation && (
                              <div>
                                <div className="text-emerald-300 mb-2 text-base font-semibold">
                                  Explanation:
                                </div>
                                <p className="text-base-content/70 text-lg font-sem">
                                  {eg.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </>
                  )}

                  {problem.contraints && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                      <div className="bg-base-200 p-6 rounded-xl mb-6">
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                          {problem.contraints}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Submissions" />
            <div className="tab-content border-base-300 bg-base-100 p-10 min-h-screen">
              <div className='h-full'>
                {isGettingSubmissions ? (
                  <div>Loading submissions...</div>
                ) : (
                  <div>
                    {problemSubmissions.length === 0 ? (
                      <div>No submissions found for this problem.</div>
                    ) : (
                      <ul>
                        {problemSubmissions.map((submission) => (
                          <li key={submission.id} className="mb-4 p-4 border border-base-300 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className={`px-2 py-1 rounded-full text-sm
                                ${submission.status === "Accepted"
                                  ? "bg-green-100 text-green-600"
                                  : submission.status === "Wrong Answer"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }`}>
                                {submission.status}
                              </span>
                            </div>
                            <div>Submitted on: {new Date(submission.submittedAt).toLocaleString()}</div>
                            <div>Language: {submission.language}</div>
                            <div>Execution Time: {submission.executionTime} ms</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Suggetions" />
            <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="hints" />
            <div className="tab-content border-base-300 bg-base-100 p-10 min-h-screen">
              <div className='h-full'>
                {problem.hints ? (
                  <ul className="list-disc list-inside">
                    {problem.hints}
                  </ul>
                ) : (
                  <p>No hints available for this problem.</p>
                )}
              </div>
            </div>

          </div>
        </div>
        <div className="divider divider-horizontal divider-neutral"></div>
        <div className='w-1/2 rounded-2xl p-5'></div>
      </div>
    </div>
  )
}

export default ProblemDetailPage