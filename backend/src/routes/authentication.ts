import express from 'express'

import {
   googleAuthCallbackController,
   googleAuthController,
   sendOTPController,
   verifyOTPController,
   addUserDetailsController,
} from '../controller/authentication'
import {
   sendOtpValidator,
   verifyOtpValidator,
   addUserDetailsValidator,
} from './../middlewares/authentication'
import { sessionValidator } from './../utils/sessionValidator'

export default (router: express.Router) => {
   router.post('/auth/send-otp', sendOtpValidator, sendOTPController)
   router.post('/auth/verify-otp', verifyOtpValidator, verifyOTPController)
   router.post(
      '/auth/add-user-details',
      sessionValidator,
      addUserDetailsValidator,
      addUserDetailsController,
   )
   router.get('/auth/google', googleAuthController)
   router.get('/auth/google/callback', googleAuthCallbackController)
}
