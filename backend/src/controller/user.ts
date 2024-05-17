import express from 'express'
import { checkIfUsernameExistsModel } from '../models/user'

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
      const { username } = req.body
      const data = await checkIfUsernameExistsModel(username)
      if (!data) {
         return res.status(200).json({ exists: false })
      }
      return res.status(200).json({ exists: true })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
