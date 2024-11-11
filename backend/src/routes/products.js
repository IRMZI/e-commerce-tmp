import express from 'express'
import ProductsControllers from '../Controllers/products.js'

const productsRouter = express.Router()
const productsControllers = new ProductsControllers()

productsRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await productsControllers.getProducts(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})

productsRouter.get('/availables/', async (req, res) => {
    const { success, statusCode, body } = await productsControllers.getAvailableProducts(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})

productsRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await productsControllers.addProducts(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await productsControllers.deleteProduct(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await productsControllers.updateProduct(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})
export default productsRouter