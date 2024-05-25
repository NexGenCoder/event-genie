import express from 'express'

import {
   createCategoryModel,
   getCategoriesByEventIdModal,
} from '../models/channelCategory'
import { getChannelCategoriesByEventIdModal } from '../models/channelCategoryModel'
import { createChannelModel } from '../models/channels'
import {
   createEventModel,
   getEventDetailsModel,
   getEventsByUserIdModel,
   getEventTypesModel,
} from '../models/events'
import { defaultCategoriesAndChannels } from '../utils/default/defaultCategoriesAndChannels'

/**
 * Get all event types
 * @param req : none
 * @param res : event types
 * @returns
 */

export const getEventTypesController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const data = await getEventTypesModel()
      return res.status(200).json({
         message: 'Event types fetched successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Create an event
 * @param req : event data
 * @param res : success message
 * @returns
 */

export const createEventController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userid } = res.locals

      const result = await createEventModel({ ...req.body, userId: userid })
      const eventid = result.eventid
      await defaultCategoriesAndChannels(eventid)
      return res
         .status(201)
         .json({ message: 'Event created successfully', data: result })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get all events by user id
 * @param req : user id
 * @param res : events
 * @returns
 */

export const getEventsByUserIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userid } = res.locals
      const data = await getEventsByUserIdModel(userid)
      if (data.length === 0) {
         return res.status(404).json({ message: 'No events found' })
      }
      return res.status(200).json({
         message: 'Events fetched successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

export const getChannelCategoriesByEventIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { eventid } = req.params
      const data = await getChannelCategoriesByEventIdModal(eventid)
      if (data.length === 0) {
         return res.status(404).json({ message: 'No categories found' })
      }
      return res.status(200).json({
         message: 'Categories fetched successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get event details
 * @param req : event id
 * @param res : event details
 * @returns
 */

export const getEventDetailsController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { eventid } = req.params
      const data = await getEventDetailsModel(eventid)
      if (!data) {
         return res.status(404).json({ message: 'Event not found' })
      }
      return res.status(200).json({
         message: 'Event details fetched successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

export const getCategoriesByEventIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { eventid } = req.params
      const data = await getCategoriesByEventIdModal(eventid)
      if (data.length === 0) {
         return res.status(404).json({ message: 'No categories found' })
      }
      return res.status(200).json({
         message: 'Categories fetched successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

export const createCategoryController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const data = await createCategoryModel(req.body)
      return res.status(201).json({
         message: 'Category created successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

export const createChannelController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const data = await createChannelModel(req.body)
      return res.status(201).json({
         message: 'Channel created successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
