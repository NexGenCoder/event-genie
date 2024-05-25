import { createConnection } from '../utils/dbconnect'

const createChannelCategoriesTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS channel_categories  (
            categoryid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            eventid UUID REFERENCES events(eventId),
            name VARCHAR(100) NOT NULL,
            description TEXT,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (eventid) REFERENCES events(eventId)
         )
      `)
   } catch (error) {
      console.error('Error creating channel_categories table: ', error)
      throw error
   }
}

export default createChannelCategoriesTable
