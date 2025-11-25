import { useEffect } from 'react'
import usePlaylistStore from '../../store/playlistStore'
import { Link, useParams } from "react-router-dom";

const PlaylistDetail = () => {
    const { playlistId } = useParams()

    const { playlist, isGettingPlaylist, getPlaylist } = usePlaylistStore()

    useEffect(() => {
        getPlaylist(playlistId)
    }, [getPlaylist])

    if (isGettingPlaylist) return <div className='min-h-screen flex justify-center items-center text-2xl'>Loading...</div>


    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto">
            {/* Playlist Title */}
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold text-base-content mb-2">
                    {playlist.name}
                </h1>
                <button className="border border-base-content/20 cursor-pointer hover:border-base-content/40 
                px-4 py-2 rounded-xl transition-all hover:bg-base-200/50">
                    Add Problem
                </button>

            </div>

            {/* Playlist Description */}
            <p className="text-base text-base-content/70 mb-6">
                {playlist.description}
            </p>

            <div>
                {playlist.problems.length > 0 ? (
                    <div className="space-y-3">
                        {playlist.problems.map((problem) => (
                            <Link
                                key={problem.id}
                                to={`/problem/${problem.id}`}
                                className="block"
                            >
                                <div className="border border-base-300 hover:border-base-content/40 bg-base-100 hover:bg-base-200 transition-all rounded-xl p-4 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-semibold text-base-content">
                                            {problem.title}
                                        </h2>

                                        <div className="badge badge-outline">
                                            {problem.difficulty}
                                        </div>
                                    </div>

                                    <p className="text-sm text-base-content/70 mt-2 line-clamp-2">
                                        {problem.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {problem.tags.map((tag, index) => (
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
            </div>
        </div>
    )
}

export default PlaylistDetail