import express, { Request, Response } from 'express'

import authentication from './authentication'
import channels from './channels'
import events from './events'
import messages from './messages '
import rsvps from './rsvps'
import user from './user'
import cleanDatabase from './../migrations/cleanDatabase'
import migrations from './../migrations'

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

router.post('/migrations', async (req: Request, res: Response) => {
   const requestPassword = req.body.password
   if (requestPassword === process.env.CLEAN_DB_PASSWORD) {
      await cleanDatabase()
      res.status(200).json({ message: 'Cleaning database' })
   } else if (requestPassword === process.env.SEED_DB_PASSWORD) {
      await migrations()
      res.status(200).json({ message: 'Seeding database' })
   } else {
      res.status(401).json({ message: 'Unauthorized' })
   }
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
