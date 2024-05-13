import { pool } from '../utils/dbconnect'

const createOtpsTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS Otps (
            otpId VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            mobile VARCHAR(20) NOT NULL,
            countryCode VARCHAR(5) NOT NULL,
            expiresAt DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            otp VARCHAR(6),
            isVerified BOOLEAN DEFAULT FALSE,
            userId VARCHAR(36),
            FOREIGN KEY (userId) REFERENCES users(userId)
         )
      `)
   } catch (error) {
      console.error('Error creating otps table: ', error)
   } finally {
      conn.release()
   }
}

export default createOtpsTable
