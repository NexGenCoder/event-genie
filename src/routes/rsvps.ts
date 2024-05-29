import express from 'express'

import {
   createDirectInviteRsvpController,
   createOpenInviteRsvpController,
   getRsvpsByEventIdController,
   getRsvpsByUserIdController,
   updateDirectInviteRsvpController,
   updateOpenInviteRsvpController,
} from '../controller/rsvps'
import { authinticate } from '../middlewares/authinticate'
import {
   createDirectInviteRsvpValidator,
   createOpenInviteRsvpValidator,
   updateDirectInviteRsvpValidator,
   updateOpenInviteRsvpValidator,
} from '../middlewares/rsvps'

export default (router: express.Router) => {
   router.post(
      '/rsvp/direct',
      authinticate,
      createDirectInviteRsvpValidator,
      createDirectInviteRsvpController,
   )
   router.post(
      '/rsvp/open',
      authinticate,
      createOpenInviteRsvpValidator,
      createOpenInviteRsvpController,
   )
   router.put(
      '/rsvp/direct',
      authinticate,
      updateDirectInviteRsvpValidator,
      updateDirectInviteRsvpController,
   )
   router.put(
      '/rsvp/open',
      authinticate,
      updateOpenInviteRsvpValidator,
      updateOpenInviteRsvpController,
   )
   router.get('/rsvp/user', authinticate, getRsvpsByUserIdController)
   router.get('/rsvp/event/:eventid', getRsvpsByEventIdController)
}
