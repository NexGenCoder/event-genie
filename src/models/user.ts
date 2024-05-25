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
         const newUser = { mobile, is_mobile_verified: true }
         const result = await client.query(
            'INSERT INTO users (mobile, is_mobile_verified) VALUES ($1, $2) RETURNING *',
            [newUser.mobile, newUser.is_mobile_verified],
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

export const getUserByuseridModel = async (userid: string) => {
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
         'UPDATE users SET username = $1, email = $2, firstname = $3, lastname = $4, profile_picture = $5, bio = $6, is_mobile_verified = $7, is_email_verified = $8, is_profile_completed = $9 WHERE userid = $10 RETURNING *',
         [
            user.username,
            user.email,
            user.firstname,
            user.lastname,
            user.profile_picture,
            user.bio,
            user.is_mobile_verified,
            user.is_email_verified,
            user.is_profile_completed,
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

export const getUserBygoogleidModel = async (googleid: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM users WHERE googleid = $1',
         [googleid],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting user by googleid: ${error}`)
   } finally {
      await client.end()
   }
}

export const getuseridByUsernameOrEmailModel = async (
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
         const updateUser = { ...user, is_email_verified: true }
         await client.query(
            'UPDATE users SET googleid = $1, profile_picture = $2, is_email_verified = $3 WHERE email = $4',
            [
               updateUser.googleid,
               updateUser.profile_picture,
               updateUser.is_email_verified,
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
            'INSERT INTO users (firstname, lastname, email, googleid, profile_picture, is_email_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
               user.firstname,
               user.lastname,
               user.email,
               user.googleid,
               user.profile_picture,
               true,
            ],
         )
         const insertId = result.rows[0].userid
         return { userid: insertId, ...user, is_email_verified: true }
      }
   } catch (error) {
      throw new Error(`Error creating/updating user: ${error}`)
   } finally {
      await client.end()
   }
}

export const getAllUsersModel = async () => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT userid, username, firstname, lastname FROM users',
      )
      return result.rows
   } catch (error) {
      throw new Error(`Error getting all users: ${error}`)
   } finally {
      await client.end()
   }
}
