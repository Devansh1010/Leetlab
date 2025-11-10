import express, { Router } from 'express'
import { addProblemToSheet, createSheet, deleteSheet, getAllSheets, getSheetById, removeProblemToSheet, updateSheet } from '../controllers/sheet.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const sheetRoute = Router()

sheetRoute.post('/createSheet', authMiddleware, createSheet)
sheetRoute.get('/getAllSheets', authMiddleware, getAllSheets)
sheetRoute.get('/getSheetById/:sheetId', authMiddleware, getSheetById)
sheetRoute.put('/updateSheet/:sheetId', authMiddleware, updateSheet)
sheetRoute.delete('/deleteSheet/:sheetId', authMiddleware, deleteSheet)
sheetRoute.post('/addProblemToSheet/:sheetId', authMiddleware, addProblemToSheet)
sheetRoute.post('/removeProblemToSheet/:sheetId', authMiddleware, removeProblemToSheet)



export default sheetRoute