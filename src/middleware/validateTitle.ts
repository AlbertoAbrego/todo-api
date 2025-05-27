import { NextFunction, Request, Response } from 'express'

export const validateTitle = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title } = req.body
    if (!title || typeof title !== 'string') {
        return res
            .status(400)
            .json({ error: 'Title is required and must be a string' })
    }
    next()
}
