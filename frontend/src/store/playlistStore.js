import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'

const usePlaylistStore = create(set => ({
    playlists: [],
    playlist: {},

    isGettingPlaylist: false,


    getAllPlaylists: async () => {
        try {
            set({ isGettingPlaylist: true })

            const res = await axiosInstance.get('/playlists')
            set({ playlists: res.data.playlists })

        } catch (error) {
            console.log("Error while getting all playlists in store", error)
        } finally {
            set({ isGettingPlaylist: false })
        }
    },

    getPlaylist: async (playlistId) => {
        try {
            set({ isGettingPlaylist: true })

            const res = await axiosInstance.get(`/get-playlist-by-id/${playlistId}`)

            set({ playlist: res.data.playlist })
        } catch (error) {
            console.log("Error while getting problem in store", error)
        } finally {
            set({ isGettingPlaylist: false })
        }
    },

}))

export default usePlaylistStore 