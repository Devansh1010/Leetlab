import React, { use, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import useProblemStore from '../store/problemStore.js';

const ProblemDetailPage = () => {

  const { problemId } = useParams()
  const { problem, isGettingProblem, getProblem } = useProblemStore()

  useEffect(() => {
    getProblem(problemId)

  }, [problemId])

  return (
    <div className='min-h-screen w-full p-6'>
      <div className='w-full flex '>
        <div className='w-1/2'>
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-border min-h-10">
            <input type="radio" name="my_tabs_2" className="tab" aria-label="Description" defaultChecked />
            <div className="tab-content border-base-300 bg-base-100 p-10 min-h-screen">
              <div className='h-full'>
                <div className="prose max-w-none">
                  <p className="text-lg mb-6">{problem.description}</p>

                  {problem.examples && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Examples:</h3>
                      {Object.entries(problem.examples).map(
                        ([lang, example], idx) => (
                          <div
                            key={lang}
                            className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                          >
                            <div className="mb-4">
                              <div className="text-indigo-300 mb-2 text-base font-semibold">
                                Input:
                              </div>
                              <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                                {example.input}
                              </span>
                            </div>
                            <div className="mb-4">
                              <div className="text-indigo-300 mb-2 text-base font-semibold">
                                Output:
                              </div>
                              <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                                {example.output}
                              </span>
                            </div>
                            {example.explanation && (
                              <div>
                                <div className="text-emerald-300 mb-2 text-base font-semibold">
                                  Explanation:
                                </div>
                                <p className="text-base-content/70 text-lg font-sem">
                                  {example.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </>
                  )}

                  {problem.constraints && (
                    <>
                      <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                      <div className="bg-base-200 p-6 rounded-xl mb-6">
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                          {problem.constraints}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Submissions" />
            <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div>

            <input type="radio" name="my_tabs_2" className="tab" aria-label="Suggetions" />
            <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div>
          </div>
        </div>
        <div className="divider divider-horizontal divider-neutral"></div>
        <div className='w-1/2 bg-amber-900'>h</div>
      </div>
    </div>
  )
}

export default ProblemDetailPage