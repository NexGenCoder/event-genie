import { IUser, IOtp } from 'types/user'
import { pool } from './../utils/dbconnect'

export const addOtpModel = async (otp: IOtp) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'INSERT INTO Otps (mobileNumber, countryCode, expiresAt, otp) VALUES (?, ?, ?, ?)',
         [otp.mobileNumber, otp.countryCode, otp.expiresAt, otp.otp],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error adding otp: ${error}`)
   } finally {
      conn.release()
   }
}

export const getOtpByMobileNumberModel = async (
   mobileNumber: string,
   otp: string,
) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'SELECT * FROM Otps WHERE mobileNumber = ? AND otp = ?',
         [mobileNumber, otp],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error getting otp by mobile number: ${error}`)
   } finally {
      conn.release()
   }
}

export const verifyOtpModel = async (mobileNumber: string, otp: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'UPDATE Otps SET isVerified = true WHERE mobileNumber = ? AND otp = ?',
         [mobileNumber, otp],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error verifying otp: ${error}`)
   } finally {
      conn.release()
   }
}

export const getUserByUsernameModel = async (username: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'SELECT * FROM users WHERE username = ?',
         [username],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error getting user by username: ${error}`)
   } finally {
      conn.release()
   }
}

export const getUserByEmailModel = async (email: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query('SELECT * FROM users WHERE email = ?', [
         email,
      ])
      return result[0]
   } catch (error) {
      throw new Error(`Error getting user by email: ${error}`)
   } finally {
      conn.release()
   }
}

export const getUserByGoogleIdModel = async (googleId: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'SELECT * FROM users WHERE googleId = ?',
         [googleId],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error getting user by googleId: ${error}`)
   } finally {
      conn.release()
   }
}

export const getUserIdByUsernameOrEmailModel = async (
   usernameOrEmail: string,
) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'SELECT id FROM users WHERE username = ? OR email = ?',
         [usernameOrEmail, usernameOrEmail],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error getting user id by username or email: ${error}`)
   } finally {
      conn.release()
   }
}

export const addUserModel = async (user: IUser) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'INSERT INTO users (username, email, firstName, lastName, role, profilePicture, bio) VALUES (?, ?, ?, ?, ?, ?, ?)',
         [
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.role,
            user.profilePicture,
            user.bio,
         ],
      )
      const insertId = result.insertId.toString()
      return { userID: insertId, ...user }
   } catch (error) {
      throw new Error(`Error adding user: ${error}`)
   } finally {
      conn.release()
   }
}
export const createGoogleUserModel = async (user: IUser) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'INSERT INTO users (firstName, lastName, email, googleId) VALUES (?, ?, ?, ?)',
         [user.firstName, user.lastName, user.email, user.googleId],
      )
      const insertId = result.insertId.toString()
      return { userID: insertId, ...user }
   } catch (error) {
      throw new Error(`Error creating user: ${error}`)
   } finally {
      conn.release()
   }
}
export const getAllUsers = async () => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query('SELECT * FROM users')
      return result[0]
   } catch (error) {
      throw new Error(`Error getting all users: ${error}`)
   } finally {
      conn.release()
   }
}
export const updateUserPasswordModel = async (
   userId: string,
   passwordHash: string,
) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'UPDATE users SET passwordHash = ? WHERE id = ?',
         [passwordHash, userId],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error updating user password: ${error}`)
   } finally {
      conn.release()
   }
}

export const updateUserGoogleIdModel = async (
   email: string,
   googleId: string,
) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'UPDATE users SET googleId = ? WHERE email = ?',
         [googleId, email],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error updating user googleId: ${error}`)
   } finally {
      conn.release()
   }
}
