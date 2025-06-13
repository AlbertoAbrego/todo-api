import { ITodo } from '../models/todo'

export const mapTodo = (todo: ITodo) => ({
    id: todo._id.toString(),
    title: todo.title,
    completed: todo.completed,
})
