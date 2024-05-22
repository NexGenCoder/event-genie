import { IUser } from 'types/user'
import { createConnection } from '../utils/dbconnect'

export const getUserByUsernameModel = async (username: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM users WHERE username = $1',
         [username],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting user by username: ${error}`)
   } finally {
      await client.end()
   }
}

export const createUserIfNotExistsModel = async (mobile: number) => {
   const client = await createConnection()
   try {
      const existingUser = await client.query(
         'SELECT * FROM users WHERE mobile = $1',
         [mobile],
      )
      if (existingUser.rows.length > 0) {
         return existingUser.rows[0]
      } else {
         const newUser = { mobile, isMobileVerified: true }
         const result = await client.query(
            'INSERT INTO users (mobile, isMobileVerified) VALUES ($1, $2) RETURNING *',
            [newUser.mobile, newUser.isMobileVerified],
         )
         const insertId = result.rows[0].userid
         const userData = await client.query(
            'SELECT * FROM users WHERE userid = $1',
            [insertId],
         )
         return userData.rows[0]
      }
   } catch (error) {
      throw new Error(`Error getting/creating user by mobile: ${error}`)
   } finally {
      await client.end()
   }
}

export const getUserByUserIdModel = async (userid: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM users WHERE userid = $1',
         [userid],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting user by id: ${error}`)
   } finally {
      await client.end()
   }
}

export const updateUserProfileModel = async (userid: string, user: IUser) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'UPDATE users SET username = $1, email = $2, firstname = $3, lastname = $4, profilepicture = $5, bio = $6, isMobileVerified = $7, isEmailVerified = $8, isProfileCompleted = $9 WHERE userid = $10 RETURNING *',
         [
            user.username,
            user.email,
            user.firstname,
            user.lastname,
            user.profilepicture,
            user.bio,
            user.isMobileVerified,
            user.isEmailVerified,
            user.isProfileCompleted,
            userid,
         ],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error updating user profile: ${error}`)
   } finally {
      await client.end()
   }
}

export const getUserByEmailModel = async (email: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM users WHERE email = $1',
         [email],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting user by email: ${error}`)
   } finally {
      await client.end()
   }
}

export const getUserByGoogleIdModel = async (googleId: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM users WHERE googleId = $1',
         [googleId],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting user by googleId: ${error}`)
   } finally {
      await client.end()
   }
}

export const getUserIdByUsernameOrEmailModel = async (
   usernameOrEmail: string,
) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT id FROM users WHERE username = $1 OR email = $2',
         [usernameOrEmail, usernameOrEmail],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting user id by username or email: ${error}`)
   } finally {
      await client.end()
   }
}

export const createOrUpdateGoogleUserModel = async (user: IUser) => {
   const client = await createConnection()
   try {
      const existingUser = await client.query(
         'SELECT * FROM users WHERE email = $1',
         [user.email],
      )
      if (existingUser.rows.length > 0) {
         const updateUser = { ...user, isEmailVerified: true }
         await client.query(
            'UPDATE users SET googleId = $1, profilepicture = $2, isEmailVerified = $3 WHERE email = $4',
            [
               updateUser.googleId,
               updateUser.profilepicture,
               updateUser.isEmailVerified,
               user.email,
            ],
         )
         const updatedUser = {
            userid: existingUser.rows[0].userid,
            ...updateUser,
         }
         return updatedUser
      } else {
         const result = await client.query(
            'INSERT INTO users (username, email, googleId, profilepicture, isEmailVerified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
               user.firstname,
               user.lastname,
               user.email,
               user.googleId,
               user.profilepicture,
               true,
            ],
         )
         const insertId = result.rows[0].userid
         return { userid: insertId, ...user, verifyEmail: true }
      }
   } catch (error) {
      throw new Error(`Error creating/updating user: ${error}`)
   } finally {
      await client.end()
   }
}

export const getAllUsers = async () => {
   const client = await createConnection()
   try {
      const result = await client.query('SELECT * FROM users')
      return result.rows
   } catch (error) {
      throw new Error(`Error getting all users: ${error}`)
   } finally {
      await client.end()
   }
}
