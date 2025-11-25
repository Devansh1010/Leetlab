import express, {Router} from 'express'
import { login, logout, me, register, checkDailyStreak, getUserCount, getAllUsers } from '../controllers/auth.controlller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/logout', authMiddleware, logout)
authRoute.get('/me', authMiddleware, me)
authRoute.post('/check', authMiddleware, checkDailyStreak)
authRoute.get('/getUserCount', authMiddleware, getUserCount)
authRoute.get('/getAllUsers', authMiddleware, getAllUsers)


export default authRoute