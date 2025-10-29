import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Importing Routes
import authRoute from './routes/auth.route.js';
import problemsRoute from './routes/problems.route.js';
import executeCodeRoute from './routes/executeCode.route.js';
import submissionRoute from './routes/submission.route.js';


dotenv.config()

//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
 
const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.json("Get to the point")
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/problems', problemsRoute)
app.use('/api/v1/execute-code', executeCodeRoute)
app.use('/api/v1/submission', submissionRoute)

app.listen(port, (req, res)=> {
    console.log('Server is running on port: ', port)
})