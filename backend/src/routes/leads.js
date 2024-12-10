import express from 'express'
import LeadsControllers from '../Controllers/leads.js'

const leadsRouter = express.Router()
const leadsControllers = new LeadsControllers()

leadsRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await leadsControllers.getLeads(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})

leadsRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await leadsControllers.createLead(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

export default leadsRouter