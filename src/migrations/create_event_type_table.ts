import { eventTypes } from '../data/eventtype'
import { createConnection } from '../utils/dbconnect'

const createEventTypeTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS event_types (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL UNIQUE,
            image_url VARCHAR(255)
         )
      `)
      for (const eventType of eventTypes) {
         await client.query(
            `
            INSERT INTO event_types (name, image_url) 
            VALUES ($1, $2)
            ON CONFLICT (name) DO UPDATE SET
            image_url = EXCLUDED.image_url
         `,
            [eventType.event_type_name, eventType.event_type_icon],
         )
      }
   } catch (error) {
      console.error('Error creating otps table: ', error)
      throw error
   }
}

export default createEventTypeTable
