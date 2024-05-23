import { createConnection } from '../utils/dbconnect'

const createEventsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
          CREATE TABLE IF NOT EXISTS Events (
             eventId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
             eventName VARCHAR(255) NOT NULL,
             organizerId UUID NOT NULL,
             startDateTime TIMESTAMPTZ NOT NULL,
             endDateTime TIMESTAMPTZ NOT NULL,
             description VARCHAR(255) NOT NULL,
             createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
             FOREIGN KEY (organizerId) REFERENCES users(userId)
          )
       `)
   } catch (error) {
      console.error('Error creating otps table: ', error)
   } finally {
      await client.end()
   }
}

export default createEventsTable
