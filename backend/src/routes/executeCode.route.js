
import { authMiddleware } from '../middleware/auth.middleware.js'
import express, {Router} from 'express'
import { executeCode } from '../controllers/executeCode.controller.js';

const executeCodeRoute = Router()

executeCodeRoute.post('/', authMiddleware, executeCode)

export default executeCodeRoute