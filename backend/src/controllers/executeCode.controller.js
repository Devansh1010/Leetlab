import { db } from '../libs/db.js'
import { getLanguageById, poolBathResults, submitBatch } from '../libs/judge0.util.js';

export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, stdin, expected_output, problem_id } = req.body;

        const userId = req.user.id;

        if (
            !Array.isArray(stdin) ||
            source_code.length === 0 ||
            !Array.isArray(expected_output) ||
            stdin.length !== expected_output.length
        ) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const submissionData = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
        }))

        const submitResponce = await submitBatch(submissionData);

        const token = submitResponce.map((res) => res.token);

        const results = await poolBathResults(token);

        console.log('Final results:', results);

        const detailedResult = results.map((result, index) => {
            const isCorrect = result.stdout?.trim() === expected_output[index].trim();
            result.isCorrect = isCorrect;

            console.log(`Test case ${index + 1}: ${isCorrect ? 'Passed' : 'Failed'}`);

            return {
                id: req.user.id, //! Not Required
                submissionId: result.token,
                testCaseNo: index + 1,
                input: stdin[index],
                expectedOutput: expected_output[index],
                actualOutput: result.stdout,
                status: result.status.description,
                stderr: result.stderr,
                passed: isCorrect,
                compileOutput: result.compile_output,
                memoryUsed: result.memory,
                timeTaken: result.time,
            }
        });

        // console.log('Detailed Results:', detailedResult);

        //? For time caclulation we take the max time taken among all test cases insted of average
        const submission = await db.submission.create({
            data: {
                userId: userId,
                problemId: problem_id,
                language: getLanguageById(language_id),
                sourceCode: source_code,
                status: detailedResult.every(res => res.passed) ? 'Accepted' : 'Wrong Answer',
                timeTaken: Math.max(...detailedResult.map(res => res.timeTaken || 0)).toString(),
                memoryUsed: Math.max(...detailedResult.map(res => res.memoryUsed || 0)).toString(),
                compileOutput: detailedResult.some(res => res.compileOutput) ? detailedResult.map(res => res.compileOutput).join('\n') : null,
                stderr: detailedResult.some(res => res.stderr) ? detailedResult.map(res => res.stderr).join('\n') : null,
                stdout: detailedResult.map(res => res.actualOutput).join(','),
                stdInput: detailedResult.map(res => res.input).join(','),
            }
        })

        const allPassed = detailedResult.every(res => res.passed);
        if (allPassed) {
            const solvedProblem = await db.problemSolved.upsert({
                where: {
                    userId_problemId: {
                        problemId: problem_id,
                        userId: userId
                    },
                },
                update: {},
                create: {
                    problemId: problem_id,
                    userId: userId
                }
            })
        }

        const testCaseResults = detailedResult.map(res => ({
            submissionId: submission.id,
            testCaseNo: res.testCaseNo,
            input: res.input,
            passed: res.passed,
            expectedOutput: res.expectedOutput,
            actualOutput: res.actualOutput,
            status: res.status,
            stderr: res.stderr,
            compileOutput: res.compileOutput,
            memoryUsed: res.memoryUsed.toString(),
            timeTaken: res.timeTaken,
        }));

        const testCase = await db.testCase.createMany({
            data: testCaseResults
        });

        const submissionWithTestCases = await db.submission.findUnique({
            where: { id: submission.id },
            include: {
                testCases: true,
            }
        });

        res.status(200).json({ Message: "Success", submission, submissionWithTestCases });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}