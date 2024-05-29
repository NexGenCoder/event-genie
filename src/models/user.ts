import { IUpdateUser, IUser } from 'types/user'

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

export const createNewUserModel = async (mobile: number) => {
   const client = await createConnection()
   try {
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
         const updateFields = []
         const updateValues = []
         if (!existingUser.rows[0].googleid) {
            updateFields.push('googleid')
            updateValues.push(updateUser.googleid)
         }
         if (!existingUser.rows[0].profile_picture) {
            updateFields.push('profile_picture')
            updateValues.push(updateUser.profile_picture)
         }
         if (!existingUser.rows[0].is_email_verified) {
            updateFields.push('is_email_verified')
            updateValues.push(true)
         }
         if (updateFields.length > 0) {
            const updateQuery = `UPDATE users SET ${updateFields.map(
               (field, index) => `${field} = $${index + 1}`,
            )} WHERE email = $${updateFields.length + 1}`
            await client.query(updateQuery, [...updateValues, user.email])
         }
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

export const updateUserMobileVerification = async (
   userid: string,
   mobile: number,
) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'UPDATE users SET is_mobile_verified = true , mobile = $1 WHERE userid = $2 RETURNING *',
         [mobile, userid],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error updating user mobile verification: ${error}`)
   } finally {
      await client.end()
   }
}

export const updateUserProfileModel = async (
   userid: string,
   user: IUpdateUser,
) => {
   const client = await createConnection()
   try {
      const updates = []
      const values = []

      if (user.username) {
         updates.push('username = $' + (values.length + 1))
         values.push(user.username)
      }
      if (user.firstname) {
         updates.push('firstname = $' + (values.length + 1))
         values.push(user.firstname)
      }
      if (user.lastname) {
         updates.push('lastname = $' + (values.length + 1))
         values.push(user.lastname)
      }
      if (user.profilePicture) {
         updates.push('profile_picture = $' + (values.length + 1))
         values.push(user.profilePicture)
      }
      if (user.bio) {
         updates.push('bio = $' + (values.length + 1))
         values.push(user.bio)
      }
      if (user.mobile) {
         updates.push('mobile = $' + (values.length + 1))
         values.push(user.mobile)
      }

      if (updates.length === 0) {
         throw new Error('No valid fields to update')
      }

      values.push(userid)
      const query = `UPDATE users SET ${updates.join(', ')} WHERE userid = $${
         values.length
      } RETURNING *`

      const result = await client.query(query, values)
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error updating user profile: ${error}`)
   } finally {
      await client.end()
   }
}
