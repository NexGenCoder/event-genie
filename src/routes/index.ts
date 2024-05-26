import express, { Request, Response } from 'express'

import authentication from './authentication'
import events from './events'
import user from './user'
import rsvps from './rsvps'
import messages from './messages '
import channels from './channels'

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
   events(router)
   rsvps(router)
   messages(router)
   channels(router)
   return router
}
