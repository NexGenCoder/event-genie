import express from 'express'
import { IOtp, IUser } from 'types/user'

import {
   addOtpModel,
   getOtpByMobileNumberModel,
   verifyOtpModel,
} from '../models/otp'
import {
   createUserIfNotExistsModel,
   getUserByUserIdModel,
   updateUserProfileModel,
} from '../models/user'
import passport from '../services/passport'
import { generateJWT } from '../utils/auth'

/**
 * Get self user data from token
 * @param req : -
 * @param res : user
 * @returns
 */
export const getSelfController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userId } = res.locals
      const user = await getUserByUserIdModel(userId)
      if (!user) {
         res.clearCookie('OG-AUTH')
         return res.status(404).json({ message: 'User not found' })
      }
      return res.status(200).json({
         message: 'User found',
         data: user,
      })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Send OTP for Sign in or Sign up
 * @param req : mobile, countryCode
 * @param res : message, data
 * @returns
 */
export const sendOTPController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { mobile, countryCode } = req.body
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 6000000) // 10 minutes

      const otpData: IOtp = {
         mobile,
         countryCode,
         expiresAt,
         otp,
      }

      await addOtpModel(otpData)
      return res.status(200).json({
         message: 'OTP sent successfully',
         data: {
            otp,
            mobile,
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
 * Verify OTP for Sign in or Sign up
 * @param req : mobile, otp
 * @param res : message
 * @returns
 */
export const verifyOTPController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { mobile, otp } = req.body
      const otpData = await getOtpByMobileNumberModel(mobile as number, otp)
      if (!otpData) {
         return res.status(404).json({ message: 'OTP not found' })
      }

      if (otpData.otp !== otp) {
         return res.status(401).json({ message: 'Invalid OTP' })
      }

      if (otpData.expiresAt < new Date() || otpData.isVerified) {
         return res.status(401).json({ message: 'OTP expired' })
      }

      await verifyOtpModel(mobile as number, otp)
      const userData = await createUserIfNotExistsModel(mobile as number)
      const payload = {
         userId: userData.userId,
      }
      const token = await generateJWT(payload)
      res.cookie('OG-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(200).json({
         message: 'OTP verified successfully',
         data: userData,
      })
   } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Update user details
 * @param req : username, email, firstName, lastName, role, profilePicture, bio
 * @param res : message
 * @returns
 */
export const updateUserDetailsController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { userId } = res.locals
      const { username, email, firstName, lastName, profilePicture, bio } =
         req.body

      await updateUserProfileModel(userId, {
         username,
         email,
         firstName,
         lastName,
         profilePicture,
         isEmailVerified: false,
         isProfileCompleted: true,
         bio,
      })

      return res
         .status(200)
         .json({ message: 'User details updated successfully' })
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
      return res.redirect('http://localhost:3000/')
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
         console.error(err)
         return res
            .status(401)
            .json({ message: 'Google authentication failed' })
      }
      if (!user) {
         console.error('User not found')
         return res
            .status(401)
            .json({ message: 'Google authentication failed' })
      }

      const payload = {
         userId: user.userId,
      }

      const token = await generateJWT(payload)

      res.cookie('OG-AUTH', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
      })

      return res.status(200).redirect(`${process.env.CLIENT_URL}`)
   })(req, res)
}
