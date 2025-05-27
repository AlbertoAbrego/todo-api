import request from 'supertest'
import app from '../src/server'

describe('POST /api/login', () => {
    it('should response with a token if credentials are correct', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })

        expect(res.status).toBe(200)
        expect(res.body.token).toBeDefined()
        expect(typeof res.body.token).toBe('string')
    })

    it('should response with 401 if username is incorrect', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'usuario', password: '1234' })

        expect(res.status).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
    })

    it('should response with 401 if password is incorrect', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'admin', password: 'wrong' })

        expect(res.status).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
    })

    it('should response with 401 if username and password are emptyh', async () => {
        const res = await request(app).post('/api/login').send({})

        expect(res.status).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
    })

    it('should response with 401 if username is empty', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ password: '1234' })

        expect(res.status).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
    })

    it('should response with 401 if password is empty', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'admin' })

        expect(res.status).toBe(401)
        expect(res.body.error).toMatch(/invalid credentials/i)
    })
})
