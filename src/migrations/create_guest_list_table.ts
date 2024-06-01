import { createConnection } from '../utils/dbconnect'

const createGuestsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS guests (
            guestlistId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            eventid UUID,
            userid UUID,
            rsvpId UUID,
            role VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (eventid) REFERENCES events(eventid),
            FOREIGN KEY (userid) REFERENCES users(userid),
            FOREIGN KEY (rsvpId) REFERENCES rsvps(rsvpId)
         )
      `)
   } catch (error) {
      console.error('Error creating guests table: ', error)
      throw error
   }
}

export default createGuestsTable
