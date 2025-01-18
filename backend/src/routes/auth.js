import express from 'express'
import AuthControllers from '../Controllers/auth.js'
import { debug } from "../helpers/logger.js"; // Import logger

const authRouter = express.Router()
const authControllers = new AuthControllers()

authRouter.post('/login', async (req, res) => {
    debug('POST /auth/login called');
    const { success, statusCode, body } = await authControllers.login(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

authRouter.post('/register', async (req, res) => {
    debug('POST /auth/register called');
    const { success, statusCode, body } = await authControllers.register(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

authRouter.post('/logout', async (req, res) => {
    debug('POST /auth/logout called');
    const { success, statusCode, body } = await authControllers.logout(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

export default authRouter
