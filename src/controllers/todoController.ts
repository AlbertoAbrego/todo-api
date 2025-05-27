import { Request, Response } from 'express'
import { todos, saveTodos } from '../data/todos'
import { Todo } from '../types/todo'
import { v4 as uuidv4 } from 'uuid'

export const getTodos = (req: Request, res: Response) => {
    const { completed } = req.query
    if (completed === 'true' || completed === 'false') {
        const filtered = todos.filter(
            (todo) => todo.completed === (completed === 'true')
        )
        return res.json(filtered)
    }
    res.json(todos)
}

export const getTodoById = (req: Request, res: Response) => {
    res.json(req.todo)
}

export const createTodo = (req: Request, res: Response) => {
    const { title } = req.body
    const newTodo: Todo = {
        id: uuidv4(),
        title,
        completed: false,
    }

    todos.push(newTodo)
    saveTodos()
    res.status(201).json(newTodo)
}

export const toggleTodo = (req: Request, res: Response) => {
    req.todo!.completed = !req.todo!.completed
    saveTodos()
    res.json(req.todo)
}

export const updateTodo = (req: Request, res: Response) => {
    req.todo!.title = req.body.title
    saveTodos()
    res.json(req.todo)
}

export const deleteTodo = (req: Request, res: Response) => {
    const index = todos.findIndex((t) => t.id === req.todo!.id)
    todos.splice(index, 1)
    saveTodos()
    res.status(204).send()
}

export const deleteCompletedTodos = (_req: Request, res: Response) => {
    const remaining = todos.filter((t) => !t.completed)
    todos.splice(0, todos.length, ...remaining)
    saveTodos()
    res.json({ message: 'completed todos deleted' })
}
