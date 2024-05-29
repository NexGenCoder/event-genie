import { createConnection } from '../utils/dbconnect'

const createDirectMessagesTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS direct_messages (
            messageid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            conversationid UUID REFERENCES conversations(conversationid),
            senderid UUID REFERENCES users(userid),
            receiverid UUID REFERENCES users(userid),
            type VARCHAR(10) CHECK (type IN ('text', 'image', 'video')),
            content TEXT,
            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
         )
      `)
   } catch (error) {
      console.error('Error creating direct_messages table: ', error)
      throw error
   } finally {
      await client.end()
   }
}

export default createDirectMessagesTable
