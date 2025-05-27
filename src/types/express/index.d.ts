import { Todo } from '../todo'

declare module 'express' {
    interface Request {
        todo?: Todo
    }
}
