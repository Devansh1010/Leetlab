import bcrypt from 'bcryptjs'
import { db } from '../libs/db.js'
import jwt from 'jsonwebtoken'

import { UserRole } from '../generated/prisma/index.js'

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body


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


        //? Streak Logic

        const today = new Date();
        const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;

        let newStreak = user.streakCount;
        let newLongestStreak = user.longestStreak;

        if (lastLogin) {
            // Calculate day difference
            const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Logged in next day => increase streak
                newStreak += 1;
            } else if (diffDays > 1) {
                // Missed a day => reset streak
                newStreak = 1;
            } // diffDays === 0 → same day login → no change
        } else {
            // First ever login
            newStreak = 1;
        }

        // Update longest streak
        if (newStreak > newLongestStreak) {
            newLongestStreak = newStreak;
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SERECT)

        console.log('Generated Token:', token)

        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        await db.user.update({
            where: { id: user.id },
            data: {
                streakCount: newStreak,
                longestStreak: newLongestStreak,
                lastLoginDate: today,
            },
        });

        console.log(res.cookies)

        return res.status(200).json({
            status: 200,
            message: "User Logged In Successfully😊",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                image: user.image,
                streakCount: newStreak,
                longestStreak: newLongestStreak,
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
        console.log('User from me', req.user)
        return res.status(200).json({
            status: 200,
            message: "User Autheticated!😊",
            user: req.user
        })
    } catch (e) {
        console.log('Error occured in Me auth catch!', e)
        res.status(500).json({ message: "Error ocured while get User" })
    }
}