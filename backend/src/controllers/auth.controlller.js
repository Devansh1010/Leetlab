import bcrypt from 'bcryptjs'
import { db } from '../libs/db.js'
import jwt from 'jsonwebtoken'

import { UserRole } from '../generated/prisma/index.js'

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body
        console.log(db.user)

        if (!email || !name || !password) {
            res.status(401).json({ status: 401, message: "Fields can't be empty🤷‍♂️" })
        }

        console.log('get here!!!')

        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })


        if (existingUser) {
            res.status(403).json({ status: 403, message: "User already exist!!😒" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const createdUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })

        console.log(createdUser)
        if (!createdUser) return res.status(500).json({ status: 400, message: "User not created!😑" })

        const token = jwt.sign({
            id: createdUser.id
        }, process.env.JWT_SERECT,
            {
                expiresIn: '7d'
            })

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            status: 200,
            message: "User created Successfully😊",
            user: {
                id: createdUser.id,
                email: createdUser.email,
                name: createdUser.name,
                role: createdUser.role,
                image: createdUser.image
            }
        })

    } catch (e) {
        console.log('Error occured in register auth catch!', e)
        res.status(500).json({ message: "Error ocured while creating User" })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(401).json({ status: 401, message: "Fields can't be empty🤷‍♂️" })
        }

        const user = await db.user.findUnique({
            where: {
                email
            }
        })


        if (!user) {
            res.status(403).json({ status: 403, message: "User not found🤷‍♂️" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(401).json({ status: 401, message: "Invalid Credetiatls🤷‍♂️" })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SERECT)

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            status: 200,
            message: "User Logged In Successfully😊",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image
            }
        })


    } catch (e) {
        console.log('Error occured in login auth catch!', e)
        res.status(500).json({ message: "Error ocured while Login User" })
    }
}

export const logout = async (req, res) => {
    try {

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
        })

        return res.status(204).json({
            status: 204,
            message: "User Logged out Successfully😊",

        })
    } catch (e) {
        console.log('Error occured in logout auth catch!', e)
        res.status(500).json({ message: "Error ocured while LogOut User" })
    }
}
export const me = async (req, res) => {
    try {
        const { } = req.body

        return res.status(200).json({
            status: 200,
            message: "User Autheticated!😊",

        })
    } catch (e) {
        console.log('Error occured in Me auth catch!', e)
        res.status(500).json({ message: "Error ocured while get User" })
    }
}