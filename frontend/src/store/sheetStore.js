import { create } from 'zustand'
import { axiosInstance } from '../libs/axios';

const useSheetStore = create((set) => ({
    sheet: null,
    isGettingSheet: false,


    getSheets: async () => {
        set({ isGettingSheet: true });
        try {
            const response = await axiosInstance.get('/sheets/getAllSheets');
            set({ sheet: response.data.sheets })
        } catch (error) {
            set({ sheet: null })
            console.error("Error checking auth:", error);
        } finally {
            set({ isGettingSheet: false });
        }
    },

}));

export default useSheetStore;