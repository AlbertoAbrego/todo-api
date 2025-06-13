import { Schema, model, Document, Types } from 'mongoose'

export interface ITodo extends Document {
    _id: Types.ObjectId
    title: string
    completed: boolean
}

const todoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
})

export const TodoModel = model<ITodo>('Todo', todoSchema)
