import { NextFunction, Request, Response } from 'express'
import { findTodoById } from '../utils/findTodoById'
import mongoose from 'mongoose'

export const checkTodoExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' })
    }
    const todo = await findTodoById(id)
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    req.todo = todo
    next()
}
