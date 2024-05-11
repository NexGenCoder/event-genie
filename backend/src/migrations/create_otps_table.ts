import { pool } from '../utils/dbconnect'

const createOtpsTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS Otps (
            otpID INT AUTO_INCREMENT PRIMARY KEY,
            mobileNumber VARCHAR(10) NOT NULL,
            countryCode VARCHAR(2) NOT NULL,
            expiresAt DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            otp VARCHAR(6),
            isVerified BOOLEAN DEFAULT FALSE
         )
      `)
      console.log('Otps table created')
   } catch (error) {
      console.error('Error creating otps table: ', error)
   } finally {
      conn.release()
   }
}

export default createOtpsTable
