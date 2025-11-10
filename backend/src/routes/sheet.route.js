import express, {Router} from 'express'
import { createSheet } from '../controllers/sheet.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const sheetRoute = Router()

sheetRoute.post('/createSheet', authMiddleware, createSheet)


export default sheetRoute