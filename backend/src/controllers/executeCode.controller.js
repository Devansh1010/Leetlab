import { db } from '../libs/db.js'
import { poolBathResults, submitBatch } from '../libs/judge0.util.js';

export const executeCode = async (req, res) => {
    try {
        const {source_code, language_id, stdin, expected_output, problem_id} = req.body;

        const userId = req.user.id;

        if(
            !Array.isArray(stdin) || 
            source_code.length === 0 ||
            !Array.isArray(expected_output) ||
            stdin.length !== expected_output.length
        ) {
            return res.status(400).json({message: 'Invalid input'});
        }

        const submission = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
        }))

        const submitResponce = await submitBatch(submission);

        const token = submitResponce.map((res)=> res.token);

        const results = await poolBathResults(token);

        console.log('Final results:', results);

        res.status(200).json({results});
    } catch (error) {
        console.error('Error executing code:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}