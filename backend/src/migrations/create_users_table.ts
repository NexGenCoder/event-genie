import { pool } from '../utils/dbconnect'

const createUsersTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS users (
            userId VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            googleId VARCHAR(36),
            username VARCHAR(16),
            firstName VARCHAR(16),
            lastName VARCHAR(16) ,
            email VARCHAR(36),
            mobile VARCHAR(20),
            profilePicture VARCHAR(255),
            bio TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            isMobileVerified BIT DEFAULT 0,
            isEmailVerified BIT DEFAULT 0,
            isProfileCompleted BIT DEFAULT 1,
            isAccountDeleted BIT DEFAULT 0,
            isAccountSuspended BIT DEFAULT 0
         )
      `)

      console.log('Users table created successfully')
   } catch (error) {
      console.error('Error creating users table:', error)
   } finally {
      conn.release()
   }
}

export default createUsersTable
