import React, { useEffect } from "react";
import usePlaylistStore from "../../store/playlistStore";
import PlaylistCard from "./PlaylistCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Playlists = () => {
  const { playlists, isGettingPlaylist, getAllPlaylists } = usePlaylistStore();

  useEffect(() => {
    getAllPlaylists();
  }, []);

  if (isGettingPlaylist) {
    return (
      <div className="flex min-h-screen justify-center items-center text-lg font-semibold text-gray-600 dark:text-gray-300">
        Loading playlists...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 " >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          LeetCode Playlists
        </h1>
        <Link to="/create-playlist">
          <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
            <Plus size={18} />
            Create Playlist
          </button>
        </Link>
      </div>

      {/* Playlist Grid */}
      {playlists && playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
              <PlaylistCard
                title={playlist.name}
                description={playlist.description}
                problemCount={playlist.problemCount || 0}
                difficulty={playlist.difficulty || "Mixed"}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 text-gray-500 dark:text-gray-400 mt-20">
          <h2 className="text-lg font-medium">No playlists available</h2>
          <Link to="/create-playlist">
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
              <Plus size={18} />
              Create Playlist
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Playlists;
