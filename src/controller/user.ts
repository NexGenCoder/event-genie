import express from 'express'

import { getAllUsersModel, getUserByUsernameModel } from '../models/user'

/**
 * Verify OTP for Sign in or Sign up
 * @param req : username
 * @param res : exists
 * @returns
 */
export const checkIfUsernameExistsController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { username } = req.params
      const data = await getUserByUsernameModel(username)
      if (!data) {
         return res.status(200).json({ exists: false })
      }
      return res.status(200).json({ exists: true })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get all users
 * @param req :
 * @param res : users
 * @returns
 */

export const getAllUsersController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const data = await getAllUsersModel()
      if (!data) {
         return res.status(200).json({
            message: 'No users found',
         })
      }
      return res.status(200).json({
         message: `Total users found: ${data.length}`,
         users: data,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
