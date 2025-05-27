import request from 'supertest'
import app from '../src/server'
import { expect401, expect403, loginAndGetToken } from './testUtils'

let adminToken: string
let userToken: string

beforeAll(async () => {
    adminToken = await loginAndGetToken('admin')
    userToken = await loginAndGetToken()
})

describe('DELETE /api/todos/completed', () => {
    it('should delete all completed todos and return 200 if user is admin', async () => {
        const response = await request(app)
            .delete('/api/todos/completed')
            .set('Authorization', `Bearer ${adminToken}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toMatch(/completed todos deleted/i)
    })

    it('should return 403 if user is not admin', async () => {
        const response = await request(app)
            .delete('/api/todos/completed')
            .set('Authorization', `Bearer ${userToken}`)
        expect(response.statusCode).toBe(403)
        expect(response.body.error).toMatch(/access denied/i)
    })

    it('should return 401 if no token is provided', async () => {
        const response = await request(app).delete('/api/todos/completed')
        expect401(response)
    })

    it('should return 403 if token is invalid', async () => {
        const response = await request(app)
            .delete('/api/todos/completed')
            .set('Authorization', `Bearer invalidToken`)
        expect403(response)
    })
})
