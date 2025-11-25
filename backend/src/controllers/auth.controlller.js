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

function startOfUTCDate(d) {
    const dt = new Date(d);
    return Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
}

export const checkDailyStreak = async (req, res) => {

    try {
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const now = new Date();
        const todayUTC = startOfUTCDate(now); // midnight UTC for today

        if (!user.lastLoginDate) {
            // First-time activity
            await db.user.update({
                where: { id: userId },
                data: {
                    streakCount: 1,
                    lastLoginDate: now,
                },
            });
            return res.json({ streak: 1 });
        }

        const lastUTC = startOfUTCDate(user.lastLoginDate);
        const msPerDay = 86_400_000; // 1000*60*60*24

        const diffDays = Math.floor((todayUTC - lastUTC) / msPerDay);

        let newStreak = user.streakCount ?? 0;
        let longestStreak = user.longestStreak

        if (diffDays === 0) {
            // Same calendar day -> no change
            return res.json({ streak: newStreak });

        } else if (diffDays === 1) {

            newStreak += 1;

        } else if (diffDays > 1) {
            newStreak = 1;
        } else {
            // Negative diff -> clocks mismatch, don't change streak but update lastLoginDate

            await db.user.update({
                where: { id: userId },
                data: { lastLoginDate: now },
            });

            return res.json({ streak: newStreak });

        }


        if (newStreak > longestStreak) {

            longestStreak = newStreak
        }

        // Persist change
        await db.user.update({
            where: { id: userId },
            data: {
                streakCount: newStreak,
                lastLoginDate: now,
                longestStreak
            },
        });

       

        return res.json({ streak: newStreak });

    } catch (err) {

        console.error("Error checking streak:", err);
        return res.status(500).json({ error: "Internal Server Error" });

    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(403).json({ status: 403, message: "Access Denied!😒" })
        }

        const userData = await db.user.findMany({
            select: {
                streakCount: true,
                longestStreak: true,
                problemsSolved: true,
                id: true,
                name: true,
                email: true
            }
        });

        console.log("All User Data: ", userData)

        return res.status(200).json({
            status: 200,
            message: "User count fetched Successfully😊",
            userData: userData || []
        })

    } catch (error) {
        console.error("Error getting all user data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUserCount = async (req, res) => {
    try {
        const user = req.user

        if (!user && user.role !== UserRole.ADMIN) {
            return res.status(403).json({ status: 403, message: "Access Denied!😒" })
        }

        const count = await db.user.count()

        return res.status(200).json({
            status: 200,
            message: "User count fetched Successfully😊",
            userCount: count
        })

    } catch (error) {

    }
}
