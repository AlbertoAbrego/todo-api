import { NextFunction, Request, Response } from 'express'

export const checkRole = (role: 'admin' | 'user') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (
            !req.user ||
            typeof req.user !== 'object' ||
            req.user.role !== role
        ) {
            return res.status(403).json({ error: 'Access denied' })
        }
        next()
    }
}
