import express from 'express'
import OrdersControllers from '../Controllers/orders.js'

const ordersRouter = express.Router()
const ordersControllers = new OrdersControllers()

ordersRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await ordersControllers.getOrders(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})
ordersRouter.get('/:id', async (req, res) => {
    const { success, statusCode, body } = await ordersControllers.getOrdersByUserId(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})

ordersRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await ordersControllers.addOrders(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

ordersRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await ordersControllers.deleteOrder(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

ordersRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await ordersControllers.updateOrder(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})
export default ordersRouter