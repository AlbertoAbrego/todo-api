import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import todoRoutes from './routes/todos'
import authRoutes from './routes/auth'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { loadTodos } from './data/todos'
import { authenticateToken } from './middleware/auth'
loadTodos()

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    })

const app = express()
const PORT = process.env.PORT || 3000

app.use(
    cors({
        origin: ['https://todo-ui-steel.vercel.app'],
        credentials: true,
    })
)
app.use(express.json())

app.use('/api/login', authRoutes)
app.use('/api/todos', authenticateToken, todoRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (_req, res) => {
    res.send('ToDo API is running')
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

export default app
