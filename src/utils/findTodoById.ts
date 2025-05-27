import { todos } from '../data/todos'
import { Todo } from '../types/todo'

export const findTodoById = (id: string): Todo | undefined => {
    return todos.find((todo) => todo.id === id)
}
