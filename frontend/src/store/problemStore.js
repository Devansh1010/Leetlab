import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'

const useProblemStore = create(set => ({
    problems: [],
    problem: {},
    solvedProblems: [],
    isGettingProblems: false,
    isGettingProblem: false,
    isGettingSolvedProblem: false,
    isGettinProblemCount: false,
    problemCount: 0,

    getAllProblems: async () => {
        try {
            set({ isGettingProblems: true })

            const res = await axiosInstance.get('/problems/getAllProblems')
            set({ problems: res.data.problems })

        } catch (error) {
            console.log("Error while getting all problems in store", error)
        } finally {
            set({ isGettingProblems: false })
        }
    },

    getProblemCount: async () => {
        try {
            set({ isGettinProblemCount: true })

            const res = await axiosInstance.get('/problems/getProblemCount')
            set({ problemCount: res.data.problemCount })

        } catch (error) {
            console.log("Error while getting problem count in store", error)
        } finally {
            set({ isGettinProblemCount: false })
        }
    },

    getProblem: async (problemId) => {
        try {
            set({ isGettingProblem: true })

            const res = await axiosInstance.get(`/problems/getProblem/${problemId}`)

            set({ problem: res.data.problem })
            console.log(res.data.problem)
        } catch (error) {
            console.log("Error while getting problem in store", error)
        } finally {
            set({ isGettingProblem: false })
        }
    },

    getAllSolvedProblems: async () => {
        try {
            set({ isGettingSolvedProblem: true })

            const res = await axiosInstance.get('/problems/solvedProblems')

            set({ solvedProblems: res.data.solvedProblems })
        } catch (error) {
            console.log("Error while getting solved problem in store", error)
        } finally {
            set({ isGettingSolvedProblem: false })
        }
    },

}))

export default useProblemStore 