import express from 'express';
import dotenv from 'dotenv';
import { adminMiddleware, authMiddleware } from '../middleware/auth.middleware.js';

dotenv.config();

import { createProblem, deleteProblem, getAllProblems, getProblemById, solvedProblemsByUser, updateProblem } from '../controllers/problems.controller.js';
const problemsRoute = express.Router();

problemsRoute.post('/createProblem', authMiddleware,  createProblem)
problemsRoute.get('/getAllProblems', authMiddleware, getAllProblems)
problemsRoute.get('/getProblem/:problemId', authMiddleware, getProblemById)
problemsRoute.put('/updateProblem/:problemId', authMiddleware, adminMiddleware, updateProblem)
problemsRoute.delete('/deleteProblem/:problemId', authMiddleware, adminMiddleware, deleteProblem)

problemsRoute.get('/solvedProblems', authMiddleware, solvedProblemsByUser)


export default problemsRoute;  