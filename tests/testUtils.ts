import request from 'supertest'
import app from '../src/server'

export const loginAndGetToken = async (username?: 'admin'): Promise<string> => {
    const response = await request(app)
        .post('/api/login')
        .send({ username: username ? username : 'notadmin', password: '1234' })
    return response.body.token
}

export const createTodo = async (token: string, title: 'Test Todo') => {
    const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({ title })
    return response.body.id
}

export const expect200withArray = (response: request.Response) => {
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
}

export const expect401 = (response: request.Response) => {
    expect(response.statusCode).toBe(401)
    expect(response.body.error).toMatch(/Token not provided/)
}

export const expect403 = (response: request.Response) => {
    expect(response.statusCode).toBe(403)
    expect(response.body.error).toMatch(/Invalid token/)
}
