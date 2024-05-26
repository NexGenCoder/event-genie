import { createConnection } from '../utils/dbconnect'

const createMessagesTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS messages (
            messageid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            channelid UUID REFERENCES channels(channelid),
            type VARCHAR(10) CHECK (type IN ('text', 'image', 'video')),
            content TEXT,
            senderid UUID REFERENCES users(userid),
            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
         )
      `)
   } catch (error) {
      console.error('Error creating messages table: ', error)
      throw error
   }
}

export default createMessagesTable
