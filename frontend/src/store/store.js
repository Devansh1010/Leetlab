import { create } from 'zustand'
import { axiosInstance } from '../libs/axios';

const useStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: false,
    gettingCount : false,
    userCount: 0,


    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get('/auth/me');
            set({ authUser: response.data.user })
        } catch (error) {
            set({ authUser: null })
            console.error("Error checking auth:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    getUserCount: async () => {
        set({ gettingCount: true });
        try {
            const response = await axiosInstance.get('/auth/getUserCount');
            set({ userCount: response.data.userCount })
        } catch (error) {
            set({ userCount: -1 })
            console.error("Error checking auth:", error);
        } finally {
            set({ gettingCount: false });
        }
    },

    signin: async (credetials) => {
        set({ isSigningIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', credetials);
            set({ authUser: response.data.user });
        } catch (error) {
            console.error("Error during login:", error);
            set({ authUser: null });
        } finally {
            set({ isSigningIn: false });
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post('/auth/logout');
            set({ authUser: null });
        } catch (error) {
            console.error("Error during login:", error);
            // set({ authUser: response.data.user });
        }
    },

    signup: async (credetials) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/register', credetials);
            set({ authUser: response.data.user });
        } catch (error) {
            console.error("Error during login:", error);
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    updateStreak: async () => {
        try {
            await axiosInstance.post(`/auth/check`, { credentials: "include" });
        } catch (err) {
            console.error("Failed to update streak:", err);
        }

    }

}));

export default useStore;