import express from 'express'

import {
   createDirectInviteRsvpModal,
   createOpenInviteRsvpModal,
   updateDirectInviteRsvpModal,
   updateOpenInviteRsvpModal,
   getRsvpsByEventIdModal,
   getRsvpsByUserIdModal,
} from '../models/rsvps'
import { isValidUUID } from './../utils/isValidUUID'

/**
 * Create a direct invite RSVP
 * @param req : userid, eventid, status, expiry_at
 * @param res : rsvp
 * @returns
 */

export const createDirectInviteRsvpController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const rsvp = await createDirectInviteRsvpModal(req.body)
      return res.status(201).json({
         message: 'Direct invite RSVP created successfully',
         data: rsvp,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Create an open invite RSVP
 * @param req : eventid, status, expiry_at, user_limit
 * @param res : rsvp
 * @returns
 * */

export const createOpenInviteRsvpController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const rsvp = await createOpenInviteRsvpModal(req.body)
      return res.status(201).json({
         message: 'Open invite RSVP created successfully',
         data: rsvp,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Update a direct invite RSVP
 * @param req : rsvp_id, status
 * @param res : rsvp
 * @returns
 * */

export const updateDirectInviteRsvpController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const rsvp = await updateDirectInviteRsvpModal(req.body)
      if (rsvp.expiry_at < new Date()) {
         return res.status(400).json({ message: 'RSVP expired' })
      }
      return res.status(200).json({
         message: 'Direct invite RSVP updated successfully',
         data: rsvp,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Update an open invite RSVP
 * @param req : rsvp_id, status
 * @param res : rsvp
 * @returns
 * */

export const updateOpenInviteRsvpController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const rsvp = await updateOpenInviteRsvpModal(req.body)
      if (rsvp.expiry_at < new Date()) {
         return res.status(400).json({ message: 'RSVP expired' })
      }
      return res.status(200).json({
         message: 'Open invite RSVP updated successfully',
         data: rsvp,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get RSVPs by event id
 * @param req : eventid
 * @param res : rsvps
 * @returns
 * */

export const getRsvpsByEventIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const eventid = req.params.eventid
      if (isValidUUID(eventid) === false) {
         return res.status(400).json({ message: 'Invalid event id' })
      }

      const rsvps = await getRsvpsByEventIdModal(eventid)
      if (rsvps.length === 0) {
         return res.status(404).json({ message: 'No RSVPs found' })
      }
      return res.status(200).json({
         message: 'RSVPs fetched successfully',
         data: rsvps,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}

/**
 * Get RSVPs by user id
 * @param req : userid
 * @param res : rsvps
 * @returns
 * */

export const getRsvpsByUserIdController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const userid = req.params.userid
      if (isValidUUID(userid) === false) {
         return res.status(400).json({ message: 'Invalid user id' })
      }
      const rsvps = await getRsvpsByUserIdModal(userid)
      if (rsvps.length === 0) {
         return res.status(404).json({ message: 'No RSVPs found' })
      }
      return res.status(200).json({
         message: 'RSVPs fetched successfully',
         data: rsvps,
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
