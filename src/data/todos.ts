import { Todo } from '../types/todo'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'todos.json')

export let todos: Todo[] = []

export const loadTodos = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        todos = JSON.parse(data)
    } catch (err) {
        todos = []
    }
}

export const saveTodos = () => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
    } catch (err) {
        console.error('Error al guardar los todos:', err)
    }
}
