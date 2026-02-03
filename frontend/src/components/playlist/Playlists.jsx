import React, { useEffect } from "react";
import usePlaylistStore from "../../store/playlistStore";
import PlaylistCard from "./PlaylistCard";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Playlists = () => {
  const { playlists, isGettingPlaylist, getAllPlaylists } = usePlaylistStore();

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  if (isGettingPlaylist) {
    return (
      <div className="flex min-h-screen justify-center items-center text-lg font-semibold text-[#0f172a] dark:text-gray-200">
        Loading playlists...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-[#161616] px-6 py-16 transition-colors">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-extrabold text-[#0f172a] dark:text-gray-100">
          LeetCode Playlists
        </h1>

        <Link to="/create-playlist">
          <button className="
            flex items-center gap-2
            border border-primary
            bg-white dark:bg-[#111111]
            text-[#0f172a] dark:text-gray-100
            px-4 py-2 rounded-xl font-semibold
            hover:bg-primary/10 dark:hover:bg-primary/20
            transition-all duration-300
          ">
            <Plus size={18} />
            Create Playlist
          </button>
        </Link>
      </div>

      {/* Playlist Grid */}
      <div className="max-w-6xl mx-auto">
        {playlists && playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h2 className="text-lg font-semibold text-[#0f172a] dark:text-gray-200">
              No playlists available
            </h2>

            <Link to="/create-playlist">
              <button className="
                flex items-center gap-2
                border border-primary
                bg-white dark:bg-[#111111]
                text-[#0f172a] dark:text-gray-100
                px-4 py-2 rounded-xl font-semibold
                hover:bg-primary/10 dark:hover:bg-primary/20
                transition-all duration-300
              ">
                <Plus size={18} />
                Create Playlist
              </button>
            </Link>
          </div>
        )}
      </div>

    </section>
  );
};

export default Playlists;
