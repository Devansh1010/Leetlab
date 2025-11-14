import { create } from 'zustand'
import { axiosInstance } from '../libs/axios';

const useSheetStore = create((set) => ({
    sheets: null,
    sheet: null,
    isGettingSheet: false,
    sheetsCount : 0,
    isGeetingSheetCount : false,


    
    getSheetsCount: async () => {
        set({ isGeetingSheetCount: true });
        try {
            const response = await axiosInstance.get('/sheets/getSheetsCount');
            set({ sheetsCount: response.data.sheetsCount })
        } catch (error) {
            set({ sheetsCount: 0 })
            console.error("Error checking auth:", error);
        } finally {
            set({ isGeetingSheetCount: false });
        }
    },

    getSheets: async () => {
        set({ isGettingSheet: true });
        try {
            const response = await axiosInstance.get('/sheets/getAllSheets');
            set({ sheets: response.data.sheets })
        } catch (error) {
            set({ sheets: null })
            console.error("Error checking auth:", error);
        } finally {
            set({ isGettingSheet: false });
        }
    },

    getSheetById: async (sheetId) => {
        set({ isGettingSheet: true });
        try {
            const response = await axiosInstance.get(`/sheets/getSheetById/${sheetId}`);
            set({ sheet: response.data.sheet })
        } catch (error) {
            set({ sheet: null })
            console.error("Error checking auth:", error);
        } finally {
            set({ isGettingSheet: false });
        }
    },

}));

export default useSheetStore;