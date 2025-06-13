import { ITodo, TodoModel } from '../models/todo'

export const findTodoById = async (id: string): Promise<ITodo | null> => {
    return await TodoModel.findById(id)
}
