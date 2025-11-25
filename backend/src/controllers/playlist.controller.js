import { db } from '../libs/db.js'


export const getAllPlaylists = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const playlists = await db.playlist.findMany({
            where: {
                userId: userId
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        });

        console.log("Fetched playlists:", playlists);
        res.status(200).json({ message: "success", playlists });

    } catch (error) {

        console.error("Error fetching playlists:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!name) {
            return res.status(400).json({ message: "Playlist name is required" });
        }

        const newPlaylist = await db.playlist.create({
            data: {
                name,
                description,
                userId
            }
        });

        if (!newPlaylist) {
            return res.status(400).json({ message: "Failed to create playlist" });
        }

        res.status(201).json({ message: "Playlist created successfully", playlist: newPlaylist });
    } catch (error) {
        console.error("Error creating playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getPlaylistById = async (req, res) => {
    try {
        
        const { playlistId } = req.params;

        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!playlistId) {
            return res.status(400).json({ message: "Playlist ID is required" });
        }

        const playlist = await db.playlist.findUnique({

            where: {
                id: playlistId,
                userId: userId
            },

            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }

        });

        console.log("Playlist is ++++++ : ", playlist)

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({ message: "success", playlist });
    } catch (error) {
        console.error("Error fetching playlist by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { name, description } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!playlistId) {
            return res.status(400).json({ message: "Playlist ID is required" });
        }

        const updatedPlaylist = await db.playlist.update({
            where: {
                id: playlistId
            },
            data: {
                name,
                description
            }
        });

        if (!updatedPlaylist) {
            return res.status(400).json({ message: "Failed to update playlist" });
        }

        res.status(200).json({ message: "Playlist updated successfully", playlist: updatedPlaylist });
    } catch (error) {
        console.error("Error updating playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!playlistId) {
            return res.status(400).json({ message: "Playlist ID is required" });
        }

        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playlistId
            }
        });

        if (!deletedPlaylist) {
            return res.status(400).json({ message: "Failed to delete playlist" });
        }

        res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
        console.error("Error deleting playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addProblemToPlaylist = async (req, res) => {
    try {

        const { playlistId } = req.params;
        const { problemIds } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!Array.isArray(problemIds) || problemIds.length === 0 || !playlistId) {
            return res.status(400).json({ message: "Playlist ID and Problem ID(s) are required" });
        }

        const playlist = await db.playlist.findUnique({
            where: {
                id: playlistId
            }
        });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        //can be avoid 
        
        // const problems = await db.problem.findMany({
        //     where: problemIds.map(id => ({ id }))
        // });

        // if (!problems  || problems.length === 0) {
        //     return res.status(404).json({ message: "Problem not found" });
        // }

        const addedProblemInPlaylist = await db.problemInPlaylist.createMany({
            data: problemIds.map(problemId => ({
                playlistId: playlistId,
                problemId: problemId
            })),
            skipDuplicates: true
        });

        res.status(200).json({ message: "Problem added to playlist successfully", problemInPlaylist: addedProblemInPlaylist });

    } catch (error) {
        console.error("Error adding problem to playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeProblemToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { problemIds } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!playlistId || !Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({ message: "Playlist ID and Problem ID are required" });
        }

        const playlist = await db.playlist.findUnique({
            where: {
                id: playlistId
            }
        });

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        //Can be avoid
        // const problem = await db.problem.findMany({
        //     where: {
        //         id: problemIds.map(id => id)
        //     }
        // });

        // if (!problem) {
        //     return res.status(404).json({ message: "Problem not found" });
        // }

        const removedProblemInPlaylist = await db.problemInPlaylist.deleteMany({
            where: problemIds.map(problemId => ({
                playlistId: playlistId,
                problemId: problemId
            }))
        });

        res.status(200).json({ message: "Problem removed from playlist successfully", problemInPlaylist: removedProblemInPlaylist });
    } catch (error) {
        console.error("Error removing problem from playlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
