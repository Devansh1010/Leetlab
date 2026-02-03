import { useEffect, useMemo, useState } from 'react'
import usePlaylistStore from '../../store/playlistStore.js'
import useProblemStore from '../../store/problemStore.js';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../libs/axios';
import { ArrowLeft } from "lucide-react";

const PlaylistDetail = () => {
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isRemoveFormOpen, setIsRemoveFormOpen] = useState(false);

    const { playlist, isGettingPlaylist, getPlaylist } = usePlaylistStore();
    const { getAllProblems, isGettingProblems, problems } = useProblemStore();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (!playlistId) return;
        getPlaylist(playlistId);
        getAllProblems();
    }, [playlistId]);

    const availableProblems = useMemo(() => {
        const playlistIds = new Set(
            (playlist?.problems || []).map(p => p.problem.id)
        );
        return (problems || []).filter(
            p => !playlistIds.has(String(p.id ?? p._id ?? p))
        );
    }, [problems, playlist]);

    const onSubmit = async (data) => {
        try {
            const selectedIds = data.problems?.map(id => id) || [];
            await axiosInstance.post(
                `/playlists/add-problem/${playlistId}`,
                { problemIds: selectedIds }
            );

            reset();
            setIsFormOpen(false);
            getPlaylist(playlistId);

        } catch (error) {
            console.log("Problem Occurred", error);
        }
    };

    const handleSingleRemove = async (problemId) => {
        try {
            await axiosInstance.post(
                `/playlists/remove-problem/${playlistId}`,
                { problemIds: [problemId] }
            );
            getPlaylist(playlistId);
        } catch (error) {
            console.log("Failed to remove", error);
        }
    };

    const onRemoveSubmit = async (data) => {
        try {
            const ids = data.removeProblems?.map(id => id) || [];

            await axiosInstance.post(
                `/playlists/remove-problem/${playlistId}`,
                { problemIds: ids }
            );

            reset();
            setIsRemoveFormOpen(false);
            getPlaylist(playlistId);

        } catch (error) {
            console.log("Remove Failed", error);
        }
    };


    if (isGettingPlaylist)
        return <div className='min-h-screen flex justify-center items-center text-2xl'>Loading...</div>

    if (isGettingProblems)
        return <div className='min-h-screen flex justify-center items-center text-2xl'>Fetching Problems...</div>

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate('/playlist')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg 
                    border border-base-300 bg-base-100 hover:border-primary hover:bg-base-200 
                    transition-all"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="flex gap-2">

                    {/* ADD PROBLEM */}
                    <button
                        className="px-4 py-2 rounded-lg border border-primary text-primary 
                        bg-base-100 hover:bg-primary hover:text-white transition-all"
                        onClick={() => setIsFormOpen(true)}
                    >
                        Add Problem
                    </button>

                    {/* REMOVE PROBLEMS */}
                    <button
                        className="px-4 py-2 rounded-lg border border-red-400 text-red-600 
                        bg-base-100 hover:bg-red-500 hover:text-white transition-all"
                        onClick={() => setIsRemoveFormOpen(true)}
                    >
                        Remove Problems
                    </button>
                </div>
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-base-content mb-2">
                {playlist?.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base text-base-content/70 mb-6">
                {playlist?.description}
            </p>

            {/* PROBLEMS LIST */}
            {playlist?.problems?.length > 0 ? (
                <div className="space-y-3">
                    {playlist.problems.map((problem) => (
                        <Link
                            key={problem.problem.id}
                            to={`/problem/${problem.problem.id}`}
                        >
                            <div className="border border-base-300 rounded-xl p-4 shadow-sm
                                bg-base-100 hover:border-primary hover:bg-base-200 transition-all">

                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-semibold text-base-content">
                                        {problem.problem.title}
                                    </h2>

                                    <div className="flex items-center gap-2">

                                        {/* REMOVE ICON */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleSingleRemove(problem.problem.id);
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>

                                        <div className="badge badge-outline">
                                            {problem.problem.difficulty}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                                    {problem.problem.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {problem.problem.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="badge badge-outline rounded-md px-3 py-1 text-xs"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info shadow-md mt-6">
                    <span>No problems found. Add some!</span>
                </div>
            )}

            {/* ADD PROBLEM POPUP */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-base-100 w-[90%] max-w-lg p-6 rounded-2xl shadow-xl border border-base-300"
                    >
                        <div className="flex justify-between mb-4 border-b pb-2">
                            <h2 className="text-xl font-semibold">Add Problems</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-xl hover:text-red-500">✕</button>
                        </div>

                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                            {availableProblems.map((problem) => (
                                <label
                                    key={problem.id}
                                    className="flex items-start gap-3 p-4 border border-base-300 rounded-lg 
                                    cursor-pointer hover:border-primary hover:bg-base-200 transition"
                                >
                                    <input
                                        type="checkbox"
                                        value={problem.id}
                                        {...register("problems")}
                                        className="checkbox checkbox-primary"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{problem.title}</h2>
                                        <p className="text-sm text-base-content/70">{problem.description}</p>
                                        <div className="badge badge-outline mt-2">{problem.difficulty}</div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button type="submit" className="btn btn-primary mt-6 w-full">
                            Add to Playlist
                        </button>
                    </form>
                </div>
            )}

            {/* REMOVE PROBLEM POPUP */}
            {isRemoveFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

                    <form
                        onSubmit={handleSubmit(onRemoveSubmit)}
                        className="bg-base-100 w-[90%] max-w-lg p-6 rounded-2xl shadow-xl border border-base-300"
                    >
                        <div className="flex justify-between mb-4 border-b pb-2">
                            <h2 className="text-xl font-semibold">Remove Problems</h2>
                            <button onClick={() => setIsRemoveFormOpen(false)} className="text-xl hover:text-red-500">✕</button>
                        </div>

                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                            {playlist?.problems?.map(({ problem }) => (
                                <label
                                    key={problem.id}
                                    className="flex items-start gap-3 p-4 border border-base-300 rounded-lg cursor-pointer 
                                    hover:border-red-400 hover:bg-red-100/40 transition"
                                >
                                    <input
                                        type="checkbox"
                                        value={problem.id}
                                        {...register("removeProblems")}
                                        className="checkbox checkbox-error"
                                    />

                                    <div>
                                        <h2 className="font-semibold">{problem.title}</h2>
                                        <p className="text-sm text-base-content/70">{problem.description}</p>
                                        <div className="badge badge-outline mt-2">{problem.difficulty}</div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button type="submit" className="btn btn-error mt-6 w-full">
                            Remove Selected
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PlaylistDetail;
