import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'

const useSubmissionStore = create(set => ({
    submissions: [],
    submissionCount: 0,
    problemSubmissions: [],

    isGettingSubmissions: false,


    getAllSubmissions: async () => {
        try {
            set({ isGettingSubmissions: true })

            const res = await axiosInstance.get('/submission/get-all-submission')
            set({ submissions: res.data.submissions })

        } catch (error) {
            console.log("Error while getting all submissions in store", error)
        } finally {
            set({ isGettingSubmissions: false })
        }
    },

    getProblemSubmission: async (problemId) => {
        try {
            set({ isGettingSubmissions: true })

            const res = await axiosInstance.get(`/submission/get-submission/${problemId}`)


            set({ problemSubmissions: res.data.submissions })
        } catch (error) {
            console.log("Error while getting problem submissions in store", error)
        } finally {
            set({ isGettingSubmissions: false })
        }
    },

    getSubmissionCount: async (problemId) => {
        try {
            const res = await axiosInstance.get(`/submission/get-submissions-count/${problemId}`)
            set({ submissionCount: res.data.count })
        } catch (error) {
            console.log("Error while getting submission count in store", error)
        }
    },

     getSubmissionCountForProblem: async (problemId) => {
        try {
            const res = await axiosInstance.get(
                `/submission/get-submissions-count/${problemId}`
            );

            set({ submissionCount: res.data.count });
        } catch (error) {
            console.log("Error getting submission count for problem", error);
            toast.error("Error getting submission count for problem");
        }
    },

}))

export default useSubmissionStore 