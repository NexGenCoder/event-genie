import express from 'express'

import {
   getSelfController,
   googleAuthCallbackController,
   googleAuthController,
   logoutController,
   sendOTPController,
   updateUserDetailsController,
   verifyOTPController,
} from '../controller/authentication'
import {
   sendOtpValidator,
   verifyOtpValidator,
} from '../middlewares/authentication'
import { authinticate } from '../middlewares/authinticate'
import { updateUserProfileValidator } from '../middlewares/users'

export default (router: express.Router) => {
   router.post('/auth/send-otp', sendOtpValidator, sendOTPController)
   router.post('/auth/verify-otp', verifyOtpValidator, verifyOTPController)
   router.post(
      '/auth/add-user-details',
      authinticate,
      updateUserProfileValidator,
      updateUserDetailsController,
   )
   router.get('/auth/self', authinticate, getSelfController)
   router.get('/auth/logout', authinticate, logoutController)
   router.get('/auth/google', googleAuthController)
   router.get('/auth/google/callback', googleAuthCallbackController)
}
