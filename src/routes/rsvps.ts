import express from 'express'

import {
   createDirectInviteRsvpController,
   createOpenInviteRsvpController,
   updateDirectInviteRsvpController,
   updateOpenInviteRsvpController,
   getRsvpsByEventIdController,
   getRsvpsByUserIdController,
} from '../controller/rsvps'

import {
   createDirectInviteRsvpValidator,
   createOpenInviteRsvpValidator,
   updateDirectInviteRsvpValidator,
   updateOpenInviteRsvpValidator,
} from '../middlewares/rsvps'
import { authinticate } from '../middlewares/authinticate'

export default (router: express.Router) => {
   router.post(
      '/rsvp/direct',
      createDirectInviteRsvpValidator,
      createDirectInviteRsvpController,
   )
   router.post(
      '/rsvp/open',
      createOpenInviteRsvpValidator,
      createOpenInviteRsvpController,
   )
   router.put(
      '/rsvp/direct',
      updateDirectInviteRsvpValidator,
      updateDirectInviteRsvpController,
   )
   router.put(
      '/rsvp/open',
      updateOpenInviteRsvpValidator,
      updateOpenInviteRsvpController,
   )
   router.get('/rsvp/user', authinticate, getRsvpsByUserIdController)
   router.get('/rsvp/event/:eventid', getRsvpsByEventIdController)
}
