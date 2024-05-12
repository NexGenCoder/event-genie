import { IOtp } from 'types/user'
import { pool } from './../utils/dbconnect'

export const addOtpModel = async (otp: IOtp) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'INSERT INTO Otps (mobile, countryCode, expiresAt, otp) VALUES (?, ?, ?, ?)',
         [otp.mobile, otp.countryCode, otp.expiresAt, otp.otp],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error adding otp: ${error}`)
   } finally {
      conn.release()
   }
}

export const getOtpByMobileNumberModel = async (
   mobile: number,
   otp: string,
) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'SELECT * FROM Otps WHERE mobile = ? AND otp = ?',
         [mobile, otp],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error getting otp by mobile number: ${error}`)
   } finally {
      conn.release()
   }
}

export const verifyOtpModel = async (mobile: number, otp: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'UPDATE Otps SET isMobileVerified = true WHERE mobile = ? AND otp = ?',
         [mobile, otp],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error verifying otp: ${error}`)
   } finally {
      conn.release()
   }
}
