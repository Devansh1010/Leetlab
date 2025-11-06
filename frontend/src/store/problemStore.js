import {create} from 'zustand'
import { axiosInstance } from '../libs/axios'

const useProblemStore = create(set => ({
    problems: [],
    problem: {},
    solvedProblems: [],
    isGettingProblems: false,
    isGettingProblem: false,
    isGettingSolvedProblem: false,

    getAllProblems : async () => {
        try {
            set({isGettingProblems: true})

            const res = await axiosInstance.get('/problems/getAllProblems')

            set({problems: res.data.problems})
        } catch (error) {
            console.log("Error while getting all problems in store", error)
        } finally {
            set({isGettingProblems: false})
        }
    },
    
    getProblem : async (problemId) => {
        try {
            set({isGettingProblem: true})

            const res = await axiosInstance.get(`/problems/getProblem/${problemId}`)

            set({problems: res.data.problem})
        } catch (error) {
            console.log("Error while getting problem in store", error)
        } finally {
            set({isGettingProblem: false})
        }
    },

    getAllSolvedProblems : async () => {
        try {
            set({isGettingSolvedProblem: true})

            const res = await axiosInstance.get('/problems/solvedProblems')

            set({solvedProblems: res.data.solvedProblems})
        } catch (error) {
            console.log("Error while getting solved problem in store", error)
        } finally {
            set({isGettingSolvedProblem: false})
        }
    },

}))

export default useProblemStore 