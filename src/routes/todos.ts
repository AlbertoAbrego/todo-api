import { Router } from 'express'
import {
    getTodos,
    getTodoById,
    createTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    deleteCompletedTodos,
} from '../controllers/todoController'
import { checkTodoExists } from '../middleware/checkTodoExists'
import { validateTitle } from '../middleware/validateTitle'
import { checkRole } from '../middleware/checkRole'

const router = Router()

router.get('/', getTodos)
router.get('/:id', checkTodoExists, getTodoById)
router.post('/', validateTitle, createTodo)
router.put('/:id', checkTodoExists, toggleTodo)
router.patch('/:id', checkTodoExists, validateTitle, updateTodo)
router.delete('/completed', checkRole('admin'), deleteCompletedTodos)
router.delete('/:id', checkTodoExists, deleteTodo)

export default router
