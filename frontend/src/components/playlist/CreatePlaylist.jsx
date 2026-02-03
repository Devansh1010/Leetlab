import React from 'react'
import { useForm } from "react-hook-form"
import { axiosInstance } from '../../libs/axios.js'
import { useNavigate, Link } from 'react-router-dom'

const CreatePlaylist = () => {
    const {
        register,
        handleSubmit,
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
        <div className="min-h-screen flex justify-center items-center bg-white dark:bg-[#161616] px-6 py-16">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    bg-white dark:bg-[#111111]
                    shadow-xl rounded-2xl
                    p-8 w-full max-w-md
                    border border-primary
                    space-y-6
                "
            >

                {/* Back Button */}
                <Link
                    to="/playlist"
                    className="
                        inline-block mb-4
                        text-sm font-semibold
                        text-primary hover:underline
                    "
                >
                    ← Back to Playlists
                </Link>

                <h2 className="text-3xl font-extrabold text-center text-[#0f172a] dark:text-gray-100">
                    Create New Playlist
                </h2>

                {/* Playlist Title */}
                <div>
                    <label className="block font-semibold text-[#0f172a] dark:text-gray-300 mb-2">
                        Playlist Title
                    </label>

                    <input
                        type="text"
                        placeholder="Enter playlist title"
                        className="
                            w-full rounded-xl px-4 py-2
                            bg-white dark:bg-[#161616]
                            text-[#0f172a] dark:text-gray-200
                            border border-primary
                            focus:outline-none focus:ring-2 focus:ring-primary
                            transition
                        "
                        {...register("name", { required: true })}
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            This field is required
                        </p>
                    )}
                </div>

                {/* Playlist Description */}
                <div>
                    <label className="block font-semibold text-[#0f172a] dark:text-gray-300 mb-2">
                        Playlist Description
                    </label>

                    <input
                        type="text"
                        placeholder="Enter short description"
                        className="
                            w-full rounded-xl px-4 py-2
                            bg-white dark:bg-[#161616]
                            text-[#0f172a] dark:text-gray-200
                            border border-primary
                            focus:outline-none focus:ring-2 focus:ring-primary
                            transition
                        "
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
                    className="
                        w-full py-3 rounded-xl font-semibold
                        border border-primary
                        bg-primary/20 dark:bg-primary/30 text-primary
                        hover:bg-primary/30 dark:hover:bg-primary/40
                        transition-all
                    "
                >
                    Create Playlist
                </button>

            </form>
        </div>
    )
}

export default CreatePlaylist
