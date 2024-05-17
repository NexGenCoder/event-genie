import { IUser } from 'types/user'

import { pool } from '../utils/dbconnect'

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

export const createUserIfNotExistsModel = async (mobile: number) => {
   const conn = await pool.getConnection()
   try {
      const existingUser = await conn.query(
         'SELECT * FROM users WHERE mobile = ?',
         [mobile],
      )
      if (existingUser.length > 0) {
         return existingUser[0]
      } else {
         const newUser = { mobile, isMobileVerified: true }
         const result = await conn.query(
            'INSERT INTO users (mobile, isMobileVerified) VALUES (?, ?)',
            [newUser.mobile, newUser.isMobileVerified],
         )
         const insertId = result.insertId
         const userData = await conn.query(
            'SELECT * FROM users WHERE userId = ?',
            [insertId],
         )
         return userData[0]
      }
   } catch (error) {
      throw new Error(`Error getting/creating user by mobile: ${error}`)
   } finally {
      conn.release()
   }
}

export const getUserByUserIdModel = async (userId: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query('SELECT * FROM users WHERE userId = ?', [
         userId,
      ])
      return result[0]
   } catch (error) {
      throw new Error(`Error getting user by id: ${error}`)
   } finally {
      conn.release()
   }
}

export const updateUserProfileModel = async (userId: string, user: IUser) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query(
         'UPDATE users SET username = ?, email = ?, firstName = ?, lastName = ?, profilePicture = ?, bio = ?, isMobileVerified = ?, isEmailVerified = ?, isProfileCompleted = ? WHERE userId = ?',
         [
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.profilePicture,
            user.bio,
            user.isMobileVerified,
            user.isEmailVerified,
            user.isProfileCompleted,
            userId,
         ],
      )
      return result[0]
   } catch (error) {
      throw new Error(`Error updating user profile: ${error}`)
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

export const createOrUpdateGoogleUserModel = async (user: IUser) => {
   const conn = await pool.getConnection()
   try {
      const existingUser = await conn.query(
         'SELECT * FROM users WHERE email = ?',
         [user.email],
      )
      if (existingUser.length > 0) {
         const updateUser = { ...user, isEmailVerified: true }
         await conn.query(
            'UPDATE users SET googleId = ?, profilePicture = ?, isEmailVerified = ? WHERE email = ?',
            [
               updateUser.googleId,
               updateUser.profilePicture,
               updateUser.isEmailVerified,
               user.email,
            ],
         )
         const updatedUser = { userId: existingUser[0].userId, ...updateUser }
         return updatedUser
      } else {
         const result = await conn.query(
            'INSERT INTO users (firstName, lastName, email, googleId, profilePicture, isEmailVerified) VALUES (?, ?, ?, ?, ?, ?)',
            [
               user.firstName,
               user.lastName,
               user.email,
               user.googleId,
               user.profilePicture,
               true,
            ],
         )
         const insertId = result.insertId.toString()
         return { userId: insertId, ...user, verifyEmail: true }
      }
   } catch (error) {
      throw new Error(`Error creating/updating user: ${error}`)
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

export const checkIfUsernameExists = async (username: string) => {
   const conn = await pool.getConnection()
   try {
      const result = await conn.query('SELECT * FROM USERS WHERE username=?', [
         username,
      ])
      return result[0]
   } catch (error) {
      throw new Error(`Error checking username: ${error}`)
   } finally {
      conn.release()
   }
}
