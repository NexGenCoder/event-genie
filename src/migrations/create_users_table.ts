import { createConnection } from '../utils/dbconnect'

const createUsersTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        userid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        googleId UUID,
        username VARCHAR(16),
        firstname VARCHAR(16),
        lastname VARCHAR(16),
        email VARCHAR(36),
        mobile VARCHAR(20),
        profilepicture VARCHAR(255),
        bio TEXT,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        isMobileVerified BOOLEAN DEFAULT FALSE,
        isEmailVerified BOOLEAN DEFAULT FALSE,
        isProfileCompleted BOOLEAN DEFAULT TRUE,
        isAccountDeleted BOOLEAN DEFAULT FALSE,
        isAccountSuspended BOOLEAN DEFAULT FALSE
      )
    `)
      console.log('Users table created successfully')
   } catch (error) {
      console.error('Error creating users table:', error)
   } finally {
      await client.end()
   }
}

export default createUsersTable
