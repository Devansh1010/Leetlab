import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.route.js';
import problemsRoute from './routes/problems.route.js';

dotenv.config()

const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.json("Get to the point")
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/problems', problemsRoute)

app.listen(port, (req, res)=> {
    console.log('Server is running on port: ', port)
    // return res.json({status: 200, message: "Server is up and running"})
})