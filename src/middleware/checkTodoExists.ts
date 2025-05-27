import { NextFunction, Request, Response } from 'express'
import { findTodoById } from '../utils/findTodoById'

export const checkTodoExists = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params
    const todo = findTodoById(id)
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    req.todo = todo
    next()
}
