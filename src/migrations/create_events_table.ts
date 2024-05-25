import { createConnection } from '../utils/dbconnect'

const createEventTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS events (
            eventId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            parent_eventid UUID REFERENCES events(eventId),
            event_name VARCHAR(100) UNIQUE NOT NULL,
            start_date_time TIMESTAMPTZ NOT NULL,
            end_date_time TIMESTAMPTZ NOT NULL,
            description TEXT,
            event_logo VARCHAR(300),
            location VARCHAR(100) NOT NULL,
            event_type VARCHAR(50) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            userid UUID NOT NULL, -- Added NOT NULL here
            FOREIGN KEY (userid) REFERENCES users(userid),
            FOREIGN KEY (parent_eventid) REFERENCES events(eventId)
         )
      `)
   } catch (error) {
      console.error('Error creating events table: ', error)
      throw error
   }
}

export default createEventTable
