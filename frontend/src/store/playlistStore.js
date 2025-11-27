import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'

const usePlaylistStore = create(set => ({
    playlists: [],
    playlist: { problems: []},
    isGettingPlaylist: false,
    isGettingPlaylists: false,


    getAllPlaylists: async () => {
        try {
            set({ isGettingPlaylists: true })

            const res = await axiosInstance.get('/playlists')
            set({ playlists: res.data.playlists })

        } catch (error) {
            console.log("Error while getting all playlists in store", error)
        } finally {
            set({ isGettingPlaylists: false })
        }
    },

    getPlaylist: async (playlistId) => {

        try {

            set({ isGettingPlaylist: true })

            const res = await axiosInstance.get(`/playlists/get-playlist-by-id/${playlistId}`)

            set({ playlist: res.data.playlist, isGettingPlaylist: false })

        } catch (error) {

            console.log("Error while getting problem in store", error)
            set({ isGettingPlaylist: false })
        } 
    },

}))

export default usePlaylistStore 