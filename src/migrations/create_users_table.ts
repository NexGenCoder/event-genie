import { createConnection } from '../utils/dbconnect'

const createUsersTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        userid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        googleid VARCHAR(36) UNIQUE,
        username VARCHAR(16),
        firstname VARCHAR(16),
        lastname VARCHAR(16),
        email VARCHAR(36),
        mobile VARCHAR(20),
        profile_picture VARCHAR(255),
        bio TEXT,
        created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        is_mobile_verified BOOLEAN DEFAULT FALSE,
        is_email_verified BOOLEAN DEFAULT FALSE,
        is_profile_completed BOOLEAN DEFAULT TRUE,
        is_account_deleted BOOLEAN DEFAULT FALSE,
        is_account_suspended BOOLEAN DEFAULT FALSE
      )
    `)
   } catch (error) {
      console.error('Error creating users table:', error)
   } finally {
      await client.end()
   }
}

export default createUsersTable
