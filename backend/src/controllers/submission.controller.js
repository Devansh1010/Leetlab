import { db } from '../libs/db.js';

export const getAllSubmissions = async (req, res) => {

    try {

        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where: {
                userId: userId
            }
        });

        return res.status(200).json({ status: 200, submissions });

    } catch (error) {
        console.error("Error fetching submissions:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }

}

export const getSubmissionForProblem = async (req, res) => {
    try {
        const userId = req.user.id;

        const { problemId } = req.params;

        console.log("Reached at Submission")

        const submissions = await db.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId
            }
        })

        return res.status(200).json({ status: 200, submissions });
    } catch (error) {
        console.error("Error fetching submissions for problem:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

export const getSubmissionCount = async (req, res) => {
    try {

        const { problemId } = req.params;

        const submissionCount = await db.submission.count({
            where: {
                problemId: problemId
            }
        });

        return res.status(200).json({ status: 200, count: submissionCount });
    } catch (error) {
        console.error("Error fetching submission count:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}