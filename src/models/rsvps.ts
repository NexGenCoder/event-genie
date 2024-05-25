import { ICreatersvp, IRsvp, IUpdateRsvp } from 'types/rsvp'
import { createConnection } from '../utils/dbconnect'

export const createDirectInviteRsvpModal = async (
   rsvpData: ICreatersvp,
): Promise<IRsvp> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
      INSERT INTO rsvps (userid, eventid, expiry_at, is_open_invite)
      VALUES ($1, $2, $3, FALSE)
      RETURNING *
      `,
         [rsvpData.userid, rsvpData.eventid, rsvpData.expiry_at],
      )
      return result.rows[0]
   } catch (error) {
      console.error('Error creating direct invite RSVP: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const createOpenInviteRsvpModal = async (
   rsvpData: ICreatersvp & { user_limit: number },
): Promise<IRsvp> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
      INSERT INTO rsvps (eventid, expiry_at, is_open_invite, user_limit)
      VALUES ($1, $2, TRUE, $3)
      RETURNING *
      `,
         [rsvpData.eventid, rsvpData.expiry_at, rsvpData.user_limit],
      )
      return result.rows[0]
   } catch (error) {
      console.error('Error creating open invite RSVP: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const updateDirectInviteRsvpModal = async (
   rsvpData: IUpdateRsvp,
): Promise<IRsvp> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
      UPDATE rsvps
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE rsvp_id = $2 AND is_open_invite = FALSE
      RETURNING *
      `,
         [rsvpData.status, rsvpData.rsvpid],
      )
      return result.rows[0]
   } catch (error) {
      console.error('Error updating direct invite RSVP: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const updateOpenInviteRsvpModal = async (
   rsvpData: IUpdateRsvp & { userId: string },
): Promise<IRsvp> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
      UPDATE rsvps
      SET status = $1, updated_at = CURRENT_TIMESTAMP, claimed_by = array_append(claimed_by, $2)
      WHERE rsvp_id = $3 AND is_open_invite = TRUE AND (claimed_by IS NULL OR array_length(claimed_by, 1) < user_limit)
      RETURNING *
      `,
         [rsvpData.status, rsvpData.userid, rsvpData.rsvpid],
      )
      return result.rows[0]
   } catch (error) {
      console.error('Error updating open invite RSVP: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const getRsvpsByEventIdModal = async (
   eventId: string,
): Promise<IRsvp[]> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
      SELECT * FROM rsvps
      WHERE eventid = $1
      `,
         [eventId],
      )
      return result.rows
   } catch (error) {
      console.error('Error getting RSVPs by event ID: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const getRsvpsByUserIdModal = async (
   userId: string,
): Promise<IRsvp[]> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
      SELECT * FROM rsvps
      WHERE userid = $1
      `,
         [userId],
      )
      return result.rows
   } catch (error) {
      console.error('Error getting RSVPs by user ID: ', error)
      throw error
   } finally {
      client.end()
   }
}
