import express from 'express'

import {
   createVendorModel,
   getAllVendorsModel,
   getVendorByOwnerIdModel,
} from '../models/vendor'

/**
 * Create a Vendor
 * @param req : vendor data
 * @param res : success / error message
 * @returns
 */
export const createVendorController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userid } = res.locals
      const result = await createVendorModel({ ...req.body, ownerId: userid })
      return res
         .status(201)
         .json({ message: 'Vendor created successfully', data: result })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get Vendor by Owner Id
 * @param req : owner id
 * @param res : vendor data
 * @returns
 */

export const getVendorByOwnerIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userid } = res.locals
      const result = await getVendorByOwnerIdModel(userid)
      if (!result) {
         return res.status(404).json({ message: 'Vendor not found' })
      }

      return res.status(200).json({
         message: 'Vendor retrieved successfully',
         data: result,
      })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get All Vendors
 * @param req : none
 * @param res : vendors data
 * @returns
 */

export const getAllVendorsController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const result = await getAllVendorsModel()
      if (!result) {
         return res.status(404).json({ message: 'Vendors not found' })
      }

      return res.status(200).json({
         message: 'Vendors retrieved successfully',
         data: result,
      })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
