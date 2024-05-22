import express from 'express'
import { getUserByUsernameModel } from '../models/user'

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
