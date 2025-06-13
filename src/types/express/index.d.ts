import { ITodo } from '../../models/todo'

declare module 'express-serve-static-core' {
    interface Request {
        todo?: ITodo
    }
}
