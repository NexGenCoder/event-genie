import { pool } from '../utils/dbconnect'

const createUsersTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS users (
            userID INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255),
            firstName VARCHAR(255),
            lastName VARCHAR(255) ,
            email VARCHAR(255),
            googleId VARCHAR(255),
            role ENUM('Organizer', 'Vendor', 'Guest'),
            subscription ENUM('Free', 'Basic', 'Premium'),
            profilePicture VARCHAR(255),
            bio TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            mobileNumber VARCHAR(20),
            isMobileVerified BIT DEFAULT 0,
            isEmailVerified BIT DEFAULT 0,
            isProfileCompleted BIT DEFAULT 0,
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
