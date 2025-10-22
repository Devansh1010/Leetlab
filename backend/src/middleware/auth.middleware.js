import jwt from 'jsonwebtoken'
import {db} from '../libs/db.js'
import dotenv from 'dotenv'

dotenv.config()

export const authMiddleware = async (req, res, next) => {
    try {
        const token = await req.cookies.jwt;
        console.log('Token in middleware:', token)
        if(!token) {
            return res.status(401).json({status: 401, message: 'Unauthorized' })
        }

        let decodedToken;
        try {  
            decodedToken =  jwt.verify(token, process.env.JWT_SERECT)  
        } catch (err) {
            return res.status(401).json({status: 401, message: 'Invalid token' })
        }

        const user = await db.user.findUnique({
            where: {
                id: decodedToken.id
            }, 
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                image: true
            }
        })

        if(!user) {
            return res.status(401).json({status: 401, message: 'Unauthorized' })
        }

        req.user = user
        next()

    } catch (error) {
        console.log('Error in auth middleware', error)
        return res.status(500).json({status: 500, message: 'Internal Server Error' })
    }
}