import express from 'express'
import { createVendorModel } from '../models/vendor'

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
