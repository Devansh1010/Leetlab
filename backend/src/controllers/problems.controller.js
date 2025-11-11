
import { db } from '../libs/db.js'
import { getAllLanguages, poolBathResults, submitBatch } from '../libs/judge0.util.js'

export const createProblem = async (req, res) => {
    try {
        const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions, hints, editorial } = req.body


        if (!title || !description || !difficulty || !testcases || !referenceSolutions || !codeSnippets) {
            return res.status(400).json({ status: 400, message: "All fields are required!" })
        }

        //Check User Role
        const uesrRole = req.user.role

        if (uesrRole !== 'ADMIN') {
            return res.status(403).json({ status: 403, message: "Forbidden: You don't have permission to perform this action." })
        }

        //Validate Reference Solutions
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getAllLanguages(language)


            if (!languageId) {
                return res.status(400).json({ status: 400, message: `Unsupported language: ${language}` })
            }

            //Loop for each testcase for each language solution

            const submissions = testcases.map((input, output) => ({
                language_id: languageId,
                source_code: solutionCode,
                stdin: input,
                expected_output: output,
            }))

            const submissionsResult = await submitBatch(submissions)

            const tokens = submissionsResult.map((res) => res.token)

            const results = poolBathResults(tokens)

            for (let i = 0; i < results.length; i++) {
                const result = results[i]
                if (result.status.id !== 3) {
                    return res.status(400).json({ status: 400, message: `Reference solution failed for language: ${language} on testcase ${i + 1}` })
                }

            }
        }

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                tags,
                difficulty,
                userId: req.user.id,
                example : examples,
                contraints : constraints,
                hints,
                editorial,
                testcases,
                codeSnippets,
                referenceSolutions,
            }
        })

        return res.status(201).json({
            status: 201,
            message: "Problem created successfully!",
            problem: newProblem
        })

    } catch (error) {
        console.error("Error creating problem:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }
}

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany()
        
        return res.status(200).json({
            status: 200,
            problems
        })
    } catch (error) {
        console.error("Error fetching problems:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }
}
export const getProblemCount = async (req, res) => {
    try {
        const problemCount = await db.problem.count()
        
        return res.status(200).json({
            status: 200,
            problemCount
        })
    } catch (error) {
        console.error("Error fetching problems:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }
}

export const getProblemById = async (req, res) => {
    try {
        const { problemId } = req.params

        console.log("Fetching problem with ID:", problemId)
        if (!problemId) {
            return res.status(400).json({ status: 400, message: "Problem ID is required!" })
        }

        const problem = await db.problem.findUnique({
            where: {
                id: problemId
            }
        })
        if (!problem) {
            return res.status(404).json({ status: 404, message: "Problem not found!" })
        }
        return res.status(200).json({
            status: 200,
            problem
        })

    } catch (error) {
        console.error("Error fetching problem by ID:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }
}

export const updateProblem = async (req, res) => {
    try {
        const { problemId } = req.params

        const { title, description, difficulty, tags, example, contraints, testcases, codeSnippets, referenceSolutions, hints, editorial } = req.body


        if (!problemId) {
            return res.status(400).json({ status: 400, message: "Problem ID is required!" })
        }

        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getAllLanguages(language)


            if (!languageId) {
                return res.status(400).json({ status: 400, message: `Unsupported language: ${language}` })
            }

            //Loop for each testcase for each language solution

            const submissions = testcases.map((input, output) => ({
                language_id: languageId,
                source_code: solutionCode,
                stdin: input,
                expected_output: output,
            }))

            const submissionsResult = await submitBatch(submissions)

            const tokens = submissionsResult.map((res) => res.token)

            const results = poolBathResults(tokens)

            for (let i = 0; i < results.length; i++) {
                const result = results[i]
                if (result.status.id !== 3) {
                    return res.status(400).json({ status: 400, message: `Reference solution failed for language: ${language} on testcase ${i + 1}` })
                }

            }
        }

        const updatedProblem = await db.problem.update({
            where: {
                id: parseInt(problemId)
            },
            data: {
                title,
                description,
                difficulty,
                tags,
                example,
                contraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                hints,
                editorial,
                userId: req.user.id,
            }
        })

        return res.status(200).json({
            status: 200,
            message: "Problem updated successfully!",
            problem: updatedProblem
        })

    } catch (error) {
        console.error("Error updating problem:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }

}

export const deleteProblem = async (req, res) => {
    try {
        const { problemId } = req.params

        if (!problemId) {
            return res.status(400).json({ status: 400, message: "Problem ID is required!" })
        }

        const deletedProblem = await db.problem.delete({
            where: {
                id: parseInt(problemId)
            }
        })

        if (!deletedProblem) {
            return res.status(404).json({ status: 404, message: "Problem not found!" })
        }

        return res.status(200).json({
            status: 200,
            message: "Problem deleted successfully!"
        })

    } catch (error) {
        console.error("Error deleting problem:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }
}

export const solvedProblemsByUser = async (req, res) => {
    try {
        const userId = req.user.id
        const problems = await db.problem.findMany({
            where: {
                problemSolved: {
                    some: {
                        userId: userId
                    }
                }
            },

            include: {
                problemSolved: {
                    where: { userId: userId }
                }
            }
        })

        console.log("Solved Problems:", problems)
        
        return res.status(200).json({
            status: 200,
            solvedProblems: problems
        })
    } catch (error) {
        console.error("Error fetching solved problems:", error)
        return res.status(500).json({ status: 500, message: "Internal server error" })
    }

}