import { db } from '../libs/db.js'
import { getIdByLanguage, getLanguageById, poolBathResults, submitBatch } from '../libs/judge0.util.js';

export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, stdin, expected_outputs, problem_id } = req.body;

        const userId = req.user.id;


        if (
            !Array.isArray(stdin) ||
            source_code.length === 0 ||
            !Array.isArray(expected_outputs) ||
            stdin.length !== expected_outputs.length
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



        let allPassed = true;
        const detailedResult = results.map((result, index) => {

            const stdout = result.stdout?.trim();
            const expected_output = expected_outputs[index]?.trim();
            const passed = stdout === expected_output;

            if (!passed) allPassed = false



            return {
                id: req.user.id, //! Not Required
                submissionId: result.token,
                testCaseNo: index + 1,
                input: stdin[index],
                expectedOutput: expected_output,
                actualOutput: result.stdout,
                status: result.status.description,
                stderr: result.stderr || null,
                passed,
                compileOutput: result.compile_output || null,
                memoryUsed: result.memory ? `${result.memory} KB` : undefined,
                timeTaken: result.time ? `${result.time} s` : undefined,
            }
        });


        //? For time caclulation we take the max time taken among all test cases insted of average
        const submission = await db.submission.create({
            data: {
                userId: userId,
                problemId: problem_id,
                language: getLanguageById(language_id),

                sourceCode: source_code,

                status: detailedResult.every(res => res.passed) ? 'Accepted' : 'Wrong Answer',

                timeTaken: detailedResult.some((r) => r.timeTaken)
                    ? JSON.stringify(detailedResult.map((r) => r.timeTaken))
                    : null,

                memoryUsed: detailedResult.some((r) => r.memoryUsed)
                    ? JSON.stringify(detailedResult.map((r) => r.memoryUsed))
                    : null,

                compileOutput: detailedResult.some(res => res.compileOutput) ? JSON.stringify(detailedResult.map(res => res.compileOutput)) : null,

                stderr: detailedResult.some(res => res.stderr) ? JSON.stringify(detailedResult.map(res => res.stderr)) : null,

                stdout: JSON.stringify(detailedResult.map(res => res.actualOutput)),

                stdInput: JSON.stringify(detailedResult.map(res => res.input)),
            }
        })

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
            memoryUsed: res.memoryUsed,
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

        res.status(200).json({ Message: "Success", submission: submissionWithTestCases });
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}