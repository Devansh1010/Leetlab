import { title } from 'process';
import { db } from '../libs/db.js'


export const getAllSheets = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const sheets = await db.sheet.findMany({
            include: {
                problems: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        tags: true,
                        difficulty: true,
                    },
                }
            }
        });

        console.log("Fetched sheets:", sheets);
        res.status(200).json({ message: "success", sheets });

    } catch (error) {

        console.error("Error fetching sheets:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createSheet = async (req, res) => {
    try {
        const { title, description, problems } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!title) {
            return res.status(400).json({ message: "sheet name is required" });
        }

        const newSheet = await db.sheet.create({
            data: {
                title,
                description,
                problems: {
                    connect: problems.map((p) => ({ id: p.id })),
                },
            }
        });

        if (!newSheet) {
            return res.status(400).json({ message: "Failed to create sheeet" });
        }

        res.status(201).json({ message: "Sheet created successfully", playlist: newSheet });
    } catch (error) {
        console.error("Error creating sheet:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSheetById = async (req, res) => {
    try {
        const { sheetId } = req.params;

        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!sheetId) {
            return res.status(400).json({ message: "Sheet ID is required" });
        }

        const sheet = await db.sheet.findUnique({
            where: {
                id: sheetId,
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

        if (!sheet) {
            return res.status(404).json({ message: "Sheet not found" });
        }

        res.status(200).json({ message: "success", sheet });

    } catch (error) {
        console.error("Error fetching sheet by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateSheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const { title, description } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!sheetId) {
            return res.status(400).json({ message: "Playlist ID is required" });
        }

        const updatedSheet = await db.sheet.update({
            where: {
                id: sheetId
            },
            data: {
                title,
                description
            }
        });

        if (!updatedSheet) {
            return res.status(400).json({ message: "Failed to update Sheet" });
        }

        res.status(200).json({ message: "Sheet updated successfully", playlist: updatedPlaylist });
    } catch (error) {
        console.error("Error updating Sheet:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteSheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!sheetId) {
            return res.status(400).json({ message: "Playlist ID is required" });
        }

        const deletedSheet = await db.sheet.delete({
            where: {
                id: sheetId
            }
        });

        if (!deletedSheet) {
            return res.status(400).json({ message: "Failed to delete sheet" });
        }

        res.status(200).json({ message: "Sheet deleted successfully" });
    } catch (error) {
        console.error("Error deleting Sheet:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addProblemToSheet = async (req, res) => {
    try {

        const { sheetId } = req.params;
        const { problemIds } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!Array.isArray(problemIds) || problemIds.length === 0 || !sheetId) {
            return res.status(400).json({ message: "Sheet ID and Problem ID(s) are required" });
        }

        const sheet = await db.sheet.findUnique({
            where: {
                id: sheetId
            }
        });

        if (!sheet) {
            return res.status(404).json({ message: "Sheet not found" });
        }

        //Problems Finding

        // const problems = await db.problem.findMany({
        //     where: problemIds.map(id => ({ id }))
        // });

        // if (!problems || problems.length === 0) {
        //     return res.status(404).json({ message: "Problem not found" });
        // }

        const addedProblemInSheet = await db.sheet.createMany({
            data: problemIds.map(problemId => ({
                sheetId: sheetId,
                problemId: problemId
            })),
            skipDuplicates: true
        });

        res.status(200).json({ message: "Problem added to Sheet successfully", problemInSheet: addedProblemInSheet });

    } catch (error) {
        console.error("Error adding problem to sheet:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeProblemToSheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const { problemIds } = req.body;
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!sheetId || !Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({ message: "Playlist ID and Problem ID are required" });
        }

        const sheet = await db.sheet.findUnique({
            where: {
                id: sheetId
            }
        });

        if (!sheet) {
            return res.status(404).json({ message: "Sheet not found" });
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


        const removedProblemInSheet = await db.sheet.deleteMany({
            where: problemIds.map(problemId => ({
                playlistId: sheetId,
                problemId: problemId
            }))
        });

        res.status(200).json({ message: "Problem removed from sheet successfully", problemInPlaylist: removedProblemInPlaylist });
    } catch (error) {
        console.error("Error removing problem from sheet:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
