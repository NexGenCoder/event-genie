import { createConnection } from '../utils/dbconnect'

const createOtpsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS otps (
            otpId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            mobile VARCHAR(20) NOT NULL,
            countryCode VARCHAR(5) NOT NULL,
            expiresAt TIMESTAMPTZ,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            otp VARCHAR(6),
            isVerified BOOLEAN DEFAULT FALSE,
            userid UUID,
            FOREIGN KEY (userid) REFERENCES users(userid)
         )
      `)
      console.log('OTPs table created successfully')
   } catch (error) {
      console.error('Error creating otps table: ', error)
   } finally {
      await client.end()
   }
}

export default createOtpsTable
