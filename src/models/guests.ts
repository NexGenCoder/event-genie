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
      console.log('Guest added: ', result.rows[0])
      return result.rows[0]
   } catch (error) {
      console.error('Error adding guest: ', error)
      throw error
   } finally {
      client.end()
   }
}

export const getGuestsModel = async (eventid: string): Promise<IGuest[]> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
        SELECT * FROM guests
        WHERE eventid = $1
        `,
         [eventid],
      )
      return result.rows
   } catch (error) {
      console.error('Error getting guests: ', error)
      throw error
   } finally {
      client.end()
   }
}
