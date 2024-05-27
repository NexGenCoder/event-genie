import { ICreatersvp, IGetUserRsvp, IRsvp, IUpdateRsvp } from 'types/rsvp'

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

export const getRsvpsByUserModal = async (
   userId: string,
): Promise<IGetUserRsvp['data']> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
         SELECT r.rsvpid, r.userid, r.eventid, r.status, r.expiry_at, r.created_at, r.updated_at,
         r.is_open_invite, r.user_limit, r.claimed_by, e.eventid as "event.eventid", e.parent_eventid,
         e.event_name, e.start_date_time, e.end_date_time, e.description, e.event_logo, e.location,
         e.event_type, e.created_at as "event.created_at", e.updated_at as "event.updated_at",
         e.userid as "event.userid"
         FROM rsvps r
         JOIN events e ON r.eventid = e.eventid
         WHERE r.userid = $1
      `,
         [userId],
      )
      return result.rows.map((row) => ({
         rsvpid: row.rsvpid,
         userid: row.userid,
         event: {
            eventid: row['event.eventid'],
            parent_eventid: row.parent_eventid,
            event_name: row.event_name,
            start_date_time: row.start_date_time,
            end_date_time: row.end_date_time,
            description: row.description,
            event_logo: row.event_logo,
            location: row.location,
            event_type: row.event_type,
            created_at: row['event.created_at'],
            updated_at: row['event.updated_at'],
            userid: row['event.userid'],
         },
         status: row.status,
         expiry_at: row.expiry_at,
         created_at: row.created_at,
         updated_at: row.updated_at,
         is_open_invite: row.is_open_invite,
         user_limit: row.user_limit,
         claimed_by: row.claimed_by,
      })) as IGetUserRsvp['data']
   } catch (error) {
      console.error('Error getting RSVPs by user ID: ', error)
      throw error
   } finally {
      client.end()
   }
}
