import express from 'express'

import {
   getServiceTypesModel,
   createServiceModel,
   getServicesModelByVendor,
   updateServiceModel,
} from '../models/services'
import { getVendorPresenceModel } from '../models/vendor'
import { isValidUUID } from '../utils/isValidUUID'

/**
 * Get all service types
 * @param req : none
 * @param res : service types
 * @returns
 */

export const getServiceTypesController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const data = await getServiceTypesModel()
      return res.status(200).json({
         message: 'Service types fetched successfully',
         data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Create a service
 * @param req : service data
 * @param res : success message
 * @returns
 */

export const createServiceController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userid } = res.locals
      const vendorid = req.params.vendorid
      if (!isValidUUID(vendorid)) {
         return res.status(400).json({ message: 'Invalid vendor id' })
      }

      const vendorPresence = await getVendorPresenceModel(userid)
      if (!vendorPresence.exists) {
         return res
            .status(400)
            .json({ message: 'Vendor does not exist for this user' })
      }

      const result = await createServiceModel({
         ...req.body,
         vendorid,
      })
      return res
         .status(201)
         .json({ message: 'Service created successfully', data: result })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get services by vendor
 * @param req : vendor id
 * @param res : services
 * @returns
 */

export const getServicesByVendorController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const vendorid = req.params.vendorid
      if (!isValidUUID(vendorid)) {
         return res.status(400).json({ message: 'Invalid vendor id' })
      }

      const result = await getServicesModelByVendor(vendorid)
      return res.status(200).json({ message: 'Services fetched', data: result })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Update a service
 * @param req : service data
 * @param res : success message
 * @returns
 */

export const updateServiceController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userid } = res.locals
      const vendorid = req.params.vendorid
      if (!isValidUUID(vendorid)) {
         return res.status(400).json({ message: 'Invalid vendor id' })
      }

      const vendorPresence = await getVendorPresenceModel(userid)
      if (!vendorPresence.exists) {
         return res
            .status(400)
            .json({ message: 'Vendor does not exist for this user' })
      }

      const result = await updateServiceModel({
         ...req.body,
         vendorid,
      })
      return res
         .status(200)
         .json({ message: 'Service updated successfully', data: result })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
