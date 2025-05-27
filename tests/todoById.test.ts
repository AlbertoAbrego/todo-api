import request from 'supertest'
import app from '../src/server'
import { createTodo, expect401, expect403, loginAndGetToken } from './testUtils'

let token: string
let todoId: string

beforeAll(async () => {
    token = await loginAndGetToken()
    todoId = await createTodo(token, 'Test Todo')
})

describe('GET /api/todos/:id', () => {
    it('should response with 200 and the todo by id', async () => {
        const response = await request(app)
            .get(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(todoId)
        expect(response.body.title).toBe('Test Todo')
        expect(response.body.completed).toBe(false)
    })

    it('should response with 401 if no token is provided', async () => {
        const response = await request(app).get(`/api/todos/${todoId}`)
        expect401(response)
    })

    it('should response with 403 if token is invalid', async () => {
        const response = await request(app)
            .get(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer invalidToken`)
        expect403(response)
    })

    it('should response with 404 if todo not found', async () => {
        const response = await request(app)
            .get('/api/todos/invalidId')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(404)
    })
})

describe('PUT /api/todos/:id', () => {
    it('should response with 200 and update the todo completed status', async () => {
        const response = await request(app)
            .put(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(todoId)
    })

    it('should response with 401 if no token is provided', async () => {
        const response = await request(app).put(`/api/todos/${todoId}`)
        expect401(response)
    })

    it('should response with 403 if token is invalid', async () => {
        const response = await request(app)
            .put(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer invalidToken`)
        expect403(response)
    })

    it('should response with 404 if todo not found', async () => {
        const response = await request(app)
            .put('/api/todos/invalidId')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(404)
    })
})

describe('PATCH /api/todos/:id', () => {
    it('should response with 200 and update the todo title', async () => {
        const updatedTitle = 'Updated Todo Title'
        const response = await request(app)
            .patch(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: updatedTitle })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(todoId)
        expect(response.body.title).toBe(updatedTitle)
    })

    it('should response with 400 if title is missing', async () => {
        const response = await request(app)
            .patch(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: '' })
        expect(response.statusCode).toBe(400)
    })

    it('should response with 401 if no token is provided', async () => {
        const response = await request(app)
            .patch(`/api/todos/${todoId}`)
            .send({ title: 'New Title' })
        expect401(response)
    })

    it('should response with 403 if token is invalid', async () => {
        const response = await request(app)
            .patch(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer invalidToken`)
            .send({ title: 'New Title' })
        expect403(response)
    })

    it('should response with 404 if todo not found', async () => {
        const response = await request(app)
            .patch('/api/todos/invalidId')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Title' })
        expect(response.statusCode).toBe(404)
    })
})

describe('DELETE /api/todos/:id', () => {
    it('should response with 204 and delete the todo', async () => {
        const response = await request(app)
            .delete(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(204)
    })

    it('should response with 401 if no token is provided', async () => {
        const response = await request(app).delete(`/api/todos/${todoId}`)
        expect401(response)
    })

    it('should response with 403 if token is invalid', async () => {
        const response = await request(app)
            .delete(`/api/todos/${todoId}`)
            .set('Authorization', `Bearer invalidToken`)
        expect403(response)
    })

    it('should response with 404 if todo not found', async () => {
        const response = await request(app)
            .delete('/api/todos/invalidId')
            .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(404)
    })
})
