import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare module 'express' {
    interface Request {
        user?: string | jwt.JwtPayload
    }
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' })
    }

    try {
        const user = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET || 'secretKey'
        )
        req.user = user
        next()
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' })
    }
}
