import express from 'express'
import {
   getEventTypesController,
   createEventController,
   getEventsByUserIdController,
} from '../controller/events'
import { CreateEventValidator } from '../middlewares/events'
import { authinticate } from '../middlewares/authinticate'

export default (router: express.Router) => {
   router.get('/event/types', getEventTypesController)
   router.post(
      '/event',
      authinticate,
      CreateEventValidator,
      createEventController,
   )
   router.get('/events', authinticate, getEventsByUserIdController)
}
