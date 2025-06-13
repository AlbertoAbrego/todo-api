import { Request, Response } from 'express'
import { todos, saveTodos } from '../data/todos'
import { TodoModel } from '../models/todo'
import { mapTodo } from '../utils/mapTodo'

export const getTodos = async (req: Request, res: Response) => {
    const { completed } = req.query
    let todos
    if (completed === 'true') {
        todos = await TodoModel.find({ completed: true })
    } else if (completed === 'false') {
        todos = await TodoModel.find({ completed: false })
    } else {
        todos = await TodoModel.find()
    }
    res.json(todos.map(mapTodo))
}

export const getTodoById = (req: Request, res: Response) => {
    const todo = req.todo
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    res.json(mapTodo(todo))
}

export const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res
            .status(400)
            .json({ error: 'Title is required and must be a string.' })
    }
    const newTodo = new TodoModel({ title })
    await newTodo.save()
    res.status(201).json(mapTodo(newTodo))
}

export const toggleTodo = async (req: Request, res: Response) => {
    const todo = req.todo
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    todo.completed = !todo.completed
    await todo.save()
    res.json(mapTodo(todo))
}

export const updateTodo = async (req: Request, res: Response) => {
    const { title } = req.body
    const todo = req.todo
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    todo.title = title
    await todo.save()
    res.json(mapTodo(todo))
}

export const deleteTodo = async (req: Request, res: Response) => {
    const todo = req.todo
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    await todo.deleteOne()
    res.sendStatus(204)
}

export const deleteCompletedTodos = async (_req: Request, res: Response) => {
    const result = await TodoModel.deleteMany({ completed: true })
    res.json({ message: `${result} completed todos deleted` })
}
