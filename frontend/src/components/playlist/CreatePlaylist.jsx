import React from 'react'
import { useForm } from "react-hook-form"
import { axiosInstance } from '../../libs/axios.js'
import { useNavigate } from 'react-router-dom'

const CreatePlaylist = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstance.post('/playlists/create-playlist', data)
            console.log("Playlist created successfully:", res.data)
            navigate('/playlist')
        } catch (error) {
            console.error("Error creating playlist:", error)
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Create New Playlist
                </h2>

                {/* Playlist Title */}
                <div className="form-group">
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Playlist Title
                    </label>
                    <input
                        type="text"
                        placeholder="Enter playlist title"
                        className="input input-bordered w-full max-w-md bg-gray-50 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("name", { required: true })}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            This field is required
                        </p>
                    )}
                </div>

                {/* Playlist Description */}
                <div className="form-group">
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Playlist Description
                    </label>
                    <input
                        type="text"
                        placeholder="Enter short description"
                        className="input input-bordered w-full max-w-md bg-gray-50 dark:bg-gray-800 dark:text-white rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("description", { required: true })}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            This field is required
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    Create Playlist
                </button>
            </form>
        </div>
    )
}

export default CreatePlaylist