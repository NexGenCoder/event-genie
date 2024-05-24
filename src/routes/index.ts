import express, { Request, Response } from 'express'

import authentication from './authentication'
import user from './user'
import eventtype from './eventtype'

const router = express.Router()
/**
 * @route GET /
 * @description Welcome message and API information
 * @access Public
 */
router.get('/', (req: Request, res: Response) => {
   res.status(200).json({
      message: 'Welcome to the Get Together API!',
      version: '0.0.1',
      description:
         'Get Together is a social event planning application that allows users to create and RSVP to events.',
   })
})

export default (): express.Router => {
   authentication(router)
   user(router)
   eventtype(router)
   return router
}
