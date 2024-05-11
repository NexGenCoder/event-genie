import express from 'express'

import {
   googleAuthCallbackController,
   googleAuthController,
} from '../controller/authentication'

export default (router: express.Router) => {
   router.get('/auth/google', googleAuthController)
   router.get('/auth/google/callback', googleAuthCallbackController)
}
