import express from 'express'

import {
   createCategoryController,
   createChannelController,
   createChildEventController,
   createEventController,
   getCategoriesByEventIdController,
   getChannelCategoriesByEventIdController,
   getChildEventsController,
   getEventDetailsController,
   getEventsByUserIdController,
   getEventTypesController,
   updateEventController,
} from '../controller/events'
import { authinticate } from '../middlewares/authinticate'
import {
   CreateCategoryValidator,
   CreateChannelValidator,
   CreateChildEventValidator,
   CreateEventValidator,
   UpdateEventValidator,
} from '../middlewares/events'

export default (router: express.Router) => {
   router.get('/event/types', getEventTypesController)
   router.post(
      '/event',
      authinticate,
      CreateEventValidator,
      createEventController,
   )
   router.get('/events', authinticate, getEventsByUserIdController)
   router.get(
      '/event/channels/:eventid',
      authinticate,
      getChannelCategoriesByEventIdController,
   )
   router.get('/event/:eventid', authinticate, getEventDetailsController)
   router.get(
      '/event/categories/:eventid',
      authinticate,
      getCategoriesByEventIdController,
   )
   router.post(
      '/event/category',
      authinticate,
      CreateCategoryValidator,
      createCategoryController,
   )
   router.post(
      '/event/channel',
      authinticate,
      CreateChannelValidator,
      createChannelController,
   )
   router.post(
      '/event/child',
      authinticate,
      CreateChildEventValidator,
      createChildEventController,
   )
   router.put(
      '/event/:eventid',
      authinticate,
      UpdateEventValidator,
      updateEventController,
   )
   router.get('/event/child/:eventid', authinticate, getChildEventsController)
}
