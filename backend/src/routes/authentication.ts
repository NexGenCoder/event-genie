import express from 'express'

import {
   googleAuthCallbackController,
   googleAuthController,
   sendOTPController,
   verifyOTPController,
   updateUserDetailsController,
   getSelfController,
   logoutController,
} from '../controller/authentication'
import {
   sendOtpValidator,
   verifyOtpValidator,
   addUserDetailsValidator,
} from './../middlewares/authentication'
import { authinticate } from './../middlewares/authinticate'

export default (router: express.Router) => {
   router.post('/auth/send-otp', sendOtpValidator, sendOTPController)
   router.post('/auth/verify-otp', verifyOtpValidator, verifyOTPController)
   router.post(
      '/auth/add-user-details',
      authinticate,
      addUserDetailsValidator,
      updateUserDetailsController,
   )
   router.get('/auth/self', authinticate, getSelfController)
   router.get('/auth/logout', authinticate, logoutController)
   router.get('/auth/google', googleAuthController)
   router.get('/auth/google/callback', googleAuthCallbackController)
}
