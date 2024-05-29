import { createConnection } from '../utils/dbconnect'

export interface IGuest {
   guestlistId?: string
   eventid: string
   userid: string
   rsvpid?: string
   role: 'guest' | 'host' | 'vendor'
   created_at?: Date
   updated_at?: Date
}

export const addGuestModel = async (guestData: IGuest): Promise<IGuest> => {
   const client = await createConnection()
   try {
      let query
      let values
      if (guestData.rsvpid) {
         query = `
                INSERT INTO guests (eventid, userid, role, rsvpid, created_at, updated_at)
                VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING *
            `
         values = [
            guestData.eventid,
            guestData.userid,
            guestData.role,
            guestData.rsvpid,
         ]
      } else {
         query = `
                INSERT INTO guests (eventid, userid, role, created_at, updated_at)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING *
            `
         values = [guestData.eventid, guestData.userid, guestData.role]
      }

      const result = await client.query(query, values)
      return result.rows[0]
   } catch (error) {
      console.error('Error adding guest: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const getGuestsModel = async (eventid: string, userid: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
         SELECT
            g.guestlistId,
            g.eventid,
            g.userid,
            g.rsvpId,
            g.role,
            u.username,
            u.firstname,
            u.lastname,
            u.profile_picture,
            u.bio
         FROM guests g
         JOIN users u ON g.userid = u.userid
         WHERE g.eventid = $1
         `,
         [eventid],
      )

      const guests = result.rows
      const specificUser = guests.find((guest) => guest.userid === userid)

      if (!specificUser) {
         console.warn(
            `User with userid ${userid} is not in the guest list for event ${eventid}`,
         )
         throw new Error(
            `User with userid ${userid} is not in the guest list for event ${eventid}`,
         )
      }

      return guests
   } catch (error) {
      console.error('Error getting guests: ', error)
      throw error
   } finally {
      client.end()
   }
}
export const getGuestDetailsModel = async (userid: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
         SELECT
            g.guestlistId,
            g.eventid,
            g.userid,
            g.rsvpId,
            g.role,
            u.username,
            u.firstname,
            u.lastname,
            u.profile_picture,
            u.bio
         FROM guests g
         JOIN users u ON g.userid = u.userid
         WHERE g.userid = $1
         `,
         [userid],
      )
      return result.rows
   } catch (error) {
      console.error('Error getting guest details: ', error)
      throw error
   } finally {
      client.end()
   }
}
