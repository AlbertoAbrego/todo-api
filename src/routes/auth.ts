import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/', (req, res) => {
    const { username, password } = req.body

    // User simulation
    if (
        (username !== 'admin' && username !== 'notadmin') ||
        password !== '1234'
    ) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    const role = username === 'admin' ? 'admin' : 'user'

    const token = jwt.sign(
        { username, role },
        process.env.JWT_SECRET || 'secretKey',
        { expiresIn: '1h' }
    )
    res.json({ token })
})

export default router
