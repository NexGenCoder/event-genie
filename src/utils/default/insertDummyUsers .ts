import { dummyUsers } from '../../data/users'
import { CreateOrUpdateUserModel, CreateUserBody } from '../../models/user'

export const insertDummyUsers = async () => {
   for (const user of dummyUsers) {
      const userBody: CreateUserBody = {
         username: user.username,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         mobile: user.mobile,
         profilePicture: user.profilePicture,
         bio: user.bio,
      }

      try {
         await CreateOrUpdateUserModel(userBody)
      } catch (error) {
         console.error(`Error inserting user ${user.username}:`, error)
      }
   }
}
