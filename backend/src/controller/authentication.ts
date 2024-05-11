import express from 'express'
import { IUser } from 'types/user'

import passport from '../services/passport'
import { generateJWT } from '../utils/auth'

/**
 * Logout a user
 * @param req : token
 * @param res : message
 * @returns
 */
export const logoutController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const token = req.cookies['OG-AUTH']

      if (!token) {
         return res.status(401).json({
            message: 'Unauthorized: No session token',
         })
      }

      res.clearCookie('OG-AUTH')
      return res.redirect('/')
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Google authentication
 * @param req : -
 * @param res : -
 * @returns
 * @description
 * 1. Authenticate user with google
 * */
export const googleAuthController = passport.authenticate('google', {
   scope: ['profile', 'email'],
})

/**
 * Callback for google authentication
 * @param req : token
 * @param res : message, user
 * @returns
 * @description
 * 1. Authenticate user with google
 * 2. If user exists, generate JWT and set cookie
 * 3. If user does not exist, create user, generate JWT and set cookie
 * 4. Redirect to client url
 * */
export const googleAuthCallbackController = (
   req: express.Request,
   res: express.Response,
) => {
   passport.authenticate('google', async (err: Error, user: IUser) => {
      if (err) {
         return res
            .status(401)
            .json({ message: 'Google authentication failed' })
      }
      if (!user) {
         return res
            .status(401)
            .json({ message: 'Google authentication failed' })
      }

      const payload = {
         userID: user.userID,
         username: user.username,
         name: user.firstName + ' ' + user.lastName,
         email: user.email,
      }

      const token = await generateJWT(payload)

      res.cookie('OG-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(200).redirect(`${process.env.CLIENT_URL}`)
   })(req, res)
}
