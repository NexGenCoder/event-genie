import { createConnection } from '../utils/dbconnect'

const createOtpsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS otps (
            otpId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            mobile VARCHAR(20) NOT NULL,
            country_code VARCHAR(5) NOT NULL,
            expires_at TIMESTAMPTZ,
            created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            otp VARCHAR(6),
            is_verified BOOLEAN DEFAULT FALSE,
            userid UUID,
            FOREIGN KEY (userid) REFERENCES users(userid)
         )
      `)
   } catch (error) {
      console.error('Error creating otps table: ', error)
      throw error
   }
}

export default createOtpsTable
