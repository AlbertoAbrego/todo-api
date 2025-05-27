import request from 'supertest'
import app from '../src/server'
import { Todo } from '../src/types/todo'
import {
    expect200withArray,
    expect401,
    expect403,
    loginAndGetToken,
} from './testUtils'

let token: string
let todoId: string

beforeAll(async () => {
    token = await loginAndGetToken()
})

describe('GET /api/todos', () => {
    it('should response with 200 and an array of todos', async () => {
        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', `Bearer ${token}`)
        expect200withArray(response)
    })

    it('should response with an array of completed todos', async () => {
        const response = await request(app)
            .get('/api/todos?completed=true')
            .set('Authorization', `Bearer ${token}`)
        expect200withArray(response)
        response.body.forEach((todo: Todo) => {
            expect(todo.completed).toBe(true)
        })
    })

    it('should response with an array of non-completed todos', async () => {
        const response = await request(app)
            .get('/api/todos?completed=false')
            .set('Authorization', `Bearer ${token}`)
        expect200withArray(response)
        response.body.forEach((todo: Todo) => {
            expect(todo.completed).toBe(false)
        })
    })

    it('should response with 401 if no token is provided', async () => {
        const response = await request(app).get('/api/todos')
        expect401(response)
    })

    it('should response with 403 if token is invalid', async () => {
        const response = await request(app)
            .get('/api/todos')
            .set('Authorization', 'Bearer invalidtoken')
        expect403(response)
    })
})

describe('POST /api/todos', () => {
    const newTodo = { title: 'POST todo' }
    it('should response with 201 and the created todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send(newTodo)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('id')
        todoId = response.body.id
        expect(response.body).toHaveProperty('title', newTodo.title)
        expect(response.body).toHaveProperty('completed', false)
    })

    it('should response with 400 if title is missing', async () => {
        const newTodo = { title: '' }
        const response = await request(app)
            .post('/api/todos')
            .send(newTodo)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(400)
    })

    it('should response with 401 if no token is provided', async () => {
        const response = await request(app).post('/api/todos').send(newTodo)
        expect401(response)
    })

    it('should response with 403 if token is invalid', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send(newTodo)
            .set('Authorization', `Bearer invalidToken`)
        expect403(response)
    })
})

afterAll(async () => {
    await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${token}`)
})
