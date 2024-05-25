import { IOtp } from 'types/user'

import { createConnection } from '../utils/dbconnect'

export const addOtpModel = async (otp: IOtp) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'INSERT INTO otps (mobile, country_code, expires_at, otp) VALUES ($1, $2, $3, $4) RETURNING *',
         [otp.mobile, otp.country_code, otp.expires_at, otp.otp],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error adding OTP: ${error}`)
   } finally {
      await client.end()
   }
}

export const getOtpByMobileNumberModel = async (
   mobile: number,
   otp: string,
) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM Otps WHERE mobile = $1 AND otp = $2',
         [mobile, otp],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting otp by mobile number: ${error}`)
   } finally {
      await client.end()
   }
}

export const verifyOtpModel = async (mobile: number, otp: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'UPDATE Otps SET is_verified = true WHERE mobile = $1 AND otp = $2 RETURNING *',
         [mobile, otp],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error verifying otp: ${error}`)
   } finally {
      await client.end()
   }
}
