import express from 'express'
import { getEventTypesController } from '../controller/eventTypes'

export default (router: express.Router) => {
   router.get('/event/types', getEventTypesController)
}
