import { createConnection } from '../utils/dbconnect'

const createRsvpsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS rsvps (
            rsvpid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            userid UUID,
            eventid UUID NOT NULL,
            status VARCHAR(10) CHECK (status IN ('accepted', 'declined', 'pending')) default 'pending',
            expiry_at TIMESTAMPTZ NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            is_open_invite BOOLEAN DEFAULT FALSE,
            user_limit INT,
            claimed_by UUID[],
            CHECK ((is_open_invite = TRUE AND user_limit IS NOT NULL) OR (is_open_invite = FALSE AND userid IS NOT NULL))
         )
      `)
   } catch (error) {
      console.error('Error creating rsvps table: ', error)
      throw error
   }
}

export default createRsvpsTable
