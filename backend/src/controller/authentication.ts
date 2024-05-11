import express from 'express'
import { IUser, IOtp } from 'types/user'

import passport from '../services/passport'
import { generateJWT } from '../utils/auth'
import {
   addOtpModel,
   addUserModel,
   getOtpByMobileNumberModel,
   verifyOtpModel,
   getUserByEmailModel,
   getUserByUsernameModel,
} from '../models/user'

/**
 * Send OTP
 * @param req : mobileNumber
 * @param res : message
 * @returns
 */
export const sendOTPController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { mobileNumber, countryCode } = req.body
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 60000)

      const otpData: IOtp = {
         mobileNumber,
         countryCode,
         expiresAt,
         otp,
      }

      await addOtpModel(otpData)

      return res.status(200).json({
         message: 'OTP sent successfully',
         data: {
            otp,
            mobileNumber,
            countryCode,
            expiresAt,
         },
      })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Verify OTP
 * @param req : mobileNumber, otp
 * @param res : message
 * @returns
 */
export const verifyOTPController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { mobileNumber, otp } = req.body

      const otpData = await getOtpByMobileNumberModel(mobileNumber, otp)

      if (!otpData) {
         return res.status(404).json({ message: 'Invalid mobile number' })
      }

      if (otpData.otp !== otp) {
         return res.status(401).json({ message: 'Invalid OTP' })
      }

      if (otpData.expiresAt < new Date()) {
         return res.status(401).json({ message: 'OTP expired' })
      }

      await verifyOtpModel(mobileNumber, otp)

      req.session!.mobileNumber = mobileNumber

      return res.status(200).json({ message: 'OTP verified successfully' })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Add user details
 * @param req : username, email, firstName, lastName, role, profilePicture, bio
 * @param res : message
 * @returns
 */
export const addUserDetailsController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { mobileNumber } = req.session!

      if (!mobileNumber) {
         return res.status(401).json({ message: 'Unauthorized' })
      }
      const {
         username,
         email,
         firstName,
         lastName,
         role,
         profilePicture,
         bio,
      } = req.body

      const user = await getUserByUsernameModel(username)

      if (user) {
         return res.status(409).json({ message: 'Username already exists' })
      }

      const emailUser = await getUserByEmailModel(email)

      if (emailUser) {
         return res.status(409).json({ message: 'Email already exists' })
      }

      // add user to database
      const result = await addUserModel({
         username,
         email,
         firstName,
         lastName,
         role,
         profilePicture,
         bio,
      })

      console.log({ result })
      const payload = {
         userID: result.userID,
         username,
         name: firstName + ' ' + lastName,
         email,
      }

      const token = await generateJWT(payload)

      res.cookie('OG-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      console.log({ result })

      return res.status(200).json({ message: 'User added successfully' })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

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
