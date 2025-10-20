import express, {Router} from 'express'
import { login, logout, me, register } from '../controllers/auth.controlller.js'

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/logout', logout)
authRoute.post('/me', me)


export default authRoute