import express from 'express'
import { getEventTypesModel } from '../models/eventtypes'

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
