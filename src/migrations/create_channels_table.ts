import { createConnection } from '../utils/dbconnect'

const createChannelsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS channels (
            channelid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            categoryid UUID,
            eventid UUID REFERENCES events(eventId),
            name VARCHAR(100) NOT NULL,
            icon VARCHAR(300),
            type VARCHAR(10) CHECK (type IN ('text', 'voice')),
            description TEXT,
            is_private BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (categoryid) REFERENCES channel_categories(categoryid)
         )
      `)
   } catch (error) {
      console.error('Error creating channels table: ', error)
      throw error
   }
}

export default createChannelsTable
