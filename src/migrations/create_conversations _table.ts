import { createConnection } from '../utils/dbconnect'

const createConversationsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS conversations (
            conversationid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user1id UUID REFERENCES users(userid),
            user2id UUID REFERENCES users(userid),
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (user1id, user2id)
         )
      `)
   } catch (error) {
      console.error('Error creating conversations table: ', error)
      throw error
   } finally {
      await client.end()
   }
}

export default createConversationsTable
