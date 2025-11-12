import express from 'express';
import { getAllSubmissions, getSubmissionForProblem, getSubmissionCount } from '../controllers/submission.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const submissionRoute = express.Router();

submissionRoute.get('/get-all-submission', authMiddleware, getAllSubmissions);
submissionRoute.get('/get-submission/:problemId',authMiddleware, getSubmissionForProblem);
submissionRoute.get('/get-submissions-count/:problemId', getSubmissionCount);


export default submissionRoute;