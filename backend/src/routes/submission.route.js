import express from 'express';
import { getAllSubmissions, getSubmissionForProblem, getSubmissionCount } from '../controllers/submission.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const submissionRoute = express.Router();

submissionRoute.post('/get-all-submission', authMiddleware, getAllSubmissions);
submissionRoute.post('/get-submission/:problemId',authMiddleware, getSubmissionForProblem);
submissionRoute.post('/get-submissions-count/:problemId', getSubmissionCount);


export default submissionRoute;